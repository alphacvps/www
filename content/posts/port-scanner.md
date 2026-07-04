---
title: "Creating a Port Scanner"
date: "2026-03-07"
warning: true
excerpt: "Learn what a Port Scanner is, how it works, and how TCP and UDP port scanning are used"
---

Today we're going to talk about what a Port Scanner is and how to build one. [Port Scanning](https://en.wikipedia.org/wiki/Port_scanner) refers to a technique designed to probe a server or host in order to determine which ports are listening on the machine. It is a technique very frequently used by system administrators to verify the security of their networks, and by hackers to search for and exploit potential vulnerabilities.

To fully understand this definition, we first need to define what a port is.

## What is a port

[Ports](https://en.wikipedia.org/wiki/Port_%28computer_networking%29) allow a computer to establish multiple simultaneous connections with other computers by ensuring that the data contained in incoming packets, that is, the data exchanged during requests, is delivered to the process that is waiting for it.

To give an example, imagine that you have just created a website: you deploy it on a server so that other users can connect to it and retrieve, for example, the home page of your site. At the same time, however, you also need to connect to your server as an administrator, perhaps to upload JavaScript and CSS files that will later be rendered and displayed to your users.

To perform these different operations, your server will use different processes, and each process will listen on a different port. For example, requests for the home page of your website typically use port 80 or 443: port 80 for unencrypted HTTP connections and port 443 for encrypted connections.

If you instead need to connect to your server to perform maintenance operations, you will almost certainly use a protocol such as [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol), which by default listens on port 20.

## How a Port Scanner works

Now that we understand what ports are and what role they play in network communications, we can analyze in detail how a Port Scanner works.

The objective of a Port Scanner is to determine the state of the ports on a remote host. To do so, the software establishes a series of communications with the target system and carefully observes its responses. Each response provides valuable information about the listening service, the operating system, firewall rules, and in some cases even the network architecture.

It is important to emphasize that a Port Scanner does not directly "see" open ports: it infers their state by interpreting the behavior of the remote system's TCP/IP stack.

## The TCP/IP stack and the role of ports

Every communication on the Internet takes place through the TCP/IP stack, a collection of protocols organized into layers.

When an application wants to communicate over the network, its data passes through the various layers of the stack until it is encapsulated into IP packets that can be transmitted.

The IP protocol is responsible only for delivering the packet to the correct host, identified by its IP address.

Once the packet reaches its destination, the transport protocol, generally TCP or UDP, takes over and uses port numbers to deliver the packet to the correct process.

A network connection can therefore be identified through four fundamental elements:

* Source IP address
* Source port
* Destination IP address
* Destination port

This combination is known as a **socket** and uniquely identifies a network communication.

## TCP ports

In the TCP protocol, a port can generally be in one of three states:

* **Open**, when a process is actually listening and accepting new connections. An open port does not necessarily represent a vulnerability; it simply indicates that a service is available.
* **Closed**, when no process is listening on that port on the host.
* **Filtered**, when the Port Scanner cannot determine its state. This generally happens because a firewall, router, or IDS/IPS system intercepts the traffic and blocks the requests before they reach the operating system.

## How a scanner determines the state of a port

The principle behind any Port Scanner is to send requests to a port and interpret the response.

The behavior of the remote system makes it possible to infer the state of the port.

In simplified terms, the process can be summarized as follows:

* if the system responds as expected by the TCP protocol for a valid connection, the port is considered open;
* if it explicitly indicates that no service is listening, the port is classified as closed;
* if no response is received or the traffic is blocked somewhere along the path, the port is classified as filtered.

The entire process is therefore based on analyzing the responses of the TCP/IP stack rather than on any prior knowledge of the services running on the target system.

## UDP ports

The UDP protocol behaves in a completely different way.

Unlike TCP, UDP is a **connectionless** protocol, meaning that it does not require a handshake. An application can immediately send a datagram without establishing a connection. This characteristic makes UDP scanning considerably more complex.

In fact, many UDP services simply do not respond to received packets. The absence of a response may indicate either that the port is open or that the packet was simply ignored. Only certain error messages make it possible to determine with certainty that a port is closed.

For this reason, UDP scans are generally slower and less reliable than TCP scans.

## Why perform a port scan

Port scanning is one of the fundamental activities in cybersecurity.

From a defensive perspective, it allows you to:

* verify which services are actually exposed;
* identify configuration mistakes;
* detect forgotten or undocumented services;
* verify the effectiveness of firewall rules;
* reduce the attack surface of the network.

From an offensive perspective, on the other hand, it represents one of the first stages of the reconnaissance process. Before attempting any attack, it is necessary to understand which services are accessible and which technologies are being used by the target system. For this reason, Port Scanning is one of the most important techniques in both **Penetration Testing** and **Cyber Defence**.

## Limitations of a Port Scanner

Although it is an extremely powerful tool, a Port Scanner has several limitations. An open port does not automatically imply the presence of a vulnerability. Likewise, a closed port does not guarantee that a system is secure. Firewalls, IDS/IPS systems, proxies, load balancers, rate limiting techniques, and other protection mechanisms can alter or conceal responses, making the results incomplete or partially inaccurate.

For this reason, a port scan represents only the initial phase of a security assessment and should always be complemented with service enumeration, service identification, software version analysis, and vulnerability assessment.

## Conclusion

The Port Scanner is one of the most important tools in networking and cybersecurity. There is no "magic" behind how it works: everything is based on understanding network protocols, interpreting the responses of remote systems, and analyzing the behavior of network ports.
