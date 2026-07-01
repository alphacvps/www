---
title: "Creating a Network Monitor"
date: "2026-03-07"
excerpt: "How to implement a network monitor that allows you to view active TCP and UDP connections on a Linux system and associate them with the processes that generated them."
---

When we use tools like `netstat` or `ss`, we often take for granted that the operating system has an immediate way to show us all open network connections and the programs using them. In reality, behind this information lies a rather interesting mechanism, and the project we are analyzing in this lesson allows us to understand it very well.

Let's see how active TCP and UDP connections are displayed, along with the process that generated them. To achieve this, we can use the information that the Linux kernel makes available through the `/proc` virtual file system.

Understanding how this software works means understanding how Linux internally represents processes, sockets, and network connections.

## The Role of the `/proc` File System

One of the historical principles of Unix systems is that a lot of system information can be exposed in the form of files. Linux follows this philosophy through `/proc`, a virtual file system created by the kernel.

Unlike a normal directory on the disk, the files contained in `/proc` are not actually saved anywhere. They are generated dynamically every time they are read and represent the current state of the system.

Within this structure, we find information about processes, memory, the CPU, and even network connections.

To find out about active TCP and UDP connections, the program reads files such as:

```text
/proc/net/tcp
/proc/net/udp

```

Each line describes a socket managed by the kernel and contains various information, including IP addresses, ports, connection state, and the associated [inode](https://en.wikipedia.org/wiki/Inode).

At first glance, this data might seem incomprehensible because it is represented in hexadecimal format. For example, an address like `0100007F:0050` actually corresponds to the IP address 127.0.0.1 on port 80.

To transform these values into a readable form, the software must decode the data and convert the representations used internally by the kernel into the formats normally used by users.

---

## From Socket to Process

Knowing that an open connection exists is useful, but often the most important question is another: which program is using it?

To answer this, we need to understand how Linux handles sockets.

A socket can be seen as the object that represents a network communication. When an application opens a TCP connection or listens on a port, the kernel creates one or more sockets to handle that communication.

Each socket has a unique identifier called an [inode](https://en.wikipedia.org/wiki/Inode).

The [inode](https://en.wikipedia.org/wiki/Inode) is fundamental because it represents the connecting link between the information present in the network files and the process using that socket.

The program exploits this very mechanism. First, it reads the [inodes](https://en.wikipedia.org/wiki/Inode) present in files like `/proc/net/tcp`, then it scans the active processes looking for the same identifier.

---

## How Processes are Identified

In Linux, every process has its own directory within `/proc`.

For example, the process with PID 1234 will be represented by `/proc/1234/`.

Inside this directory, there is a subfolder called `fd`, short for [file descriptor](https://en.wikipedia.org/wiki/File_descriptor).

[File descriptors](https://en.wikipedia.org/wiki/File_descriptor) are the references that a process uses to access files, devices, pipes, and sockets.

When a process owns a network connection, a reference to a socket will also appear among its [file descriptors](https://en.wikipedia.org/wiki/File_descriptor). A typical example is:

```text
socket:[123456]

```

The number enclosed in square brackets is precisely the socket's [inode](https://en.wikipedia.org/wiki/Inode).

At this point, the program can build a map that associates every [inode](https://en.wikipedia.org/wiki/Inode) to its owning process. Subsequently, it compares this map with the [inodes](https://en.wikipedia.org/wiki/Inode) found in the TCP or UDP connections.

When it finds a match, it can accurately determine which process opened that connection.

This is the most important step of the entire software, as it allows transitioning from a simple list of connections to a comprehensive view linking network activity and applications.

---

## TCP Connection States

Besides addresses and ports, the kernel also stores the state of every TCP connection.

TCP is a connection-oriented protocol, and every communication goes through different phases during its lifecycle.

In the `/proc` files, these states are represented by numeric codes that the software translates into understandable names.

Among the most common states we find:

* **LISTEN**, when an application is waiting for new connections;
* **ESTABLISHED**, when the communication is active;
* **SYN_SENT** and **SYN_RECV** during the initial phase of opening the connection;
* **CLOSE_WAIT** and **FIN_WAIT** during the closing procedure;
* **TIME_WAIT**, a temporary state maintained by the protocol to ensure the proper termination of the communication.

Observing these states allows us to understand a lot about an application's behavior and network conditions.

---

## Why Such an Approach is Useful

Simply by reading `/proc`, it is possible to reconstruct a fairly accurate snapshot of the system's network activity, identifying which programs are communicating, which ports are listening, and which connections are active at any given moment.

This type of information is useful both during software development and in system administration tasks.

For example, it can help identify a service occupying an already used port, verify if an application is communicating correctly with a remote server, or diagnose problems related to connections that are not closed properly.

---

## A Concept Also Used in Cybersecurity

The exact same principles are used by many professional monitoring and forensic analysis tools.

The ability to associate a connection with a process allows one to quickly understand the system's behavior and spot any anomalies.

For instance, an administrator might notice an unexpected service listening on an unknown port or a process maintaining connections to unusual destinations.

Naturally, the software cannot independently determine whether an activity is legitimate or malicious. However, it provides detailed visibility into system communications, leaving the analyst with the task of interpreting the collected information.

If you want to experience these mechanisms firsthand and see how they are put into practice, you can find a basic version of this network monitor, written entirely in Go, available on our [GitHub](https://github.com/alphacops/wcct).