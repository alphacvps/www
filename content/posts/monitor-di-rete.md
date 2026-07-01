---
title: "Creare un Monitor di Rete"
date: "2026-03-07"
excerpt: "Come implementare un monitor di rete che permette di visualizzare le connessioni TCP e UDP attive su un sistema Linux e di associarle ai processi che le hanno generate."
---

Quando utilizziamo strumenti come `netstat` o `ss`, spesso diamo per scontato che il sistema operativo abbia un modo immediato per mostrarci tutte le connessioni di rete aperte e i programmi che le stanno utilizzando. In realtà dietro queste informazioni esiste un meccanismo piuttosto interessante, e il progetto che analizziamo in questa lezione permette di comprenderlo molto bene.

Vediamo come vengono mostrate le connessioni TCP e UDP attive ed il processo da cui sono generate. Per riuscirci possiamo usare le informazioni che il kernel Linux rende disponibili attraverso il file system virtuale `/proc`.

Comprendere il funzionamento di questo software significa quindi capire come Linux rappresenta internamente processi, socket e connessioni di rete.

## Il ruolo del file system `/proc`

Uno dei principi storici dei sistemi Unix è che molte informazioni del sistema possono essere esposte sotto forma di file. Linux segue questa filosofia attraverso `/proc`, un file system virtuale creato dal kernel.

A differenza di una normale directory presente sul disco, i file contenuti in `/proc` non vengono realmente salvati da nessuna parte. Vengono generati dinamicamente ogni volta che vengono letti e rappresentano lo stato attuale del sistema.

All'interno di questa struttura troviamo informazioni sui processi, sulla memoria, sulla CPU e anche sulle connessioni di rete.

Per conoscere le connessioni TCP e UDP attive il programma legge file come:

```text
/proc/net/tcp
/proc/net/udp
```

Ogni riga descrive un socket gestito dal kernel e contiene varie informazioni, tra cui indirizzi IP, porte, stato della connessione e [inode](https://en.wikipedia.org/wiki/Inode) associato.

A una prima lettura questi dati possono sembrare incomprensibili perché vengono rappresentati in formato esadecimale. Ad esempio, un indirizzo come `0100007F:0050` corrisponde in realtà all'indirizzo IP 127.0.0.1 sulla porta 80.

Per trasformare questi valori in una forma leggibile il software deve decodificare i dati e convertire le rappresentazioni utilizzate internamente dal kernel nei formati normalmente utilizzati dagli utenti.

## Dal socket al processo

Sapere che esiste una connessione aperta è utile, ma spesso la domanda più importante è un'altra: quale programma la sta utilizzando?

Per rispondere bisogna capire come Linux gestisce i socket.

Un socket può essere visto come l'oggetto che rappresenta una comunicazione di rete. Quando un'applicazione apre una connessione TCP o si mette in ascolto su una porta, il kernel crea uno o più socket per gestire quella comunicazione.

Ogni socket possiede un identificatore univoco chiamato [inode](https://en.wikipedia.org/wiki/Inode).

L'[inode](https://en.wikipedia.org/wiki/Inode) è fondamentale perché rappresenta il punto di collegamento tra le informazioni presenti nei file di rete e il processo che utilizza quel socket.

Il programma sfrutta proprio questo meccanismo. Prima legge gli [inode](https://en.wikipedia.org/wiki/Inode) presenti nei file come `/proc/net/tcp`, poi analizza i processi attivi alla ricerca dello stesso identificatore.

## Come vengono individuati i processi

In Linux ogni processo possiede una propria directory all'interno di `/proc`.

Ad esempio, il processo con PID 1234 sarà rappresentato da `/proc/1234/`.

All'interno di questa directory esiste una sottocartella chiamata `fd`, abbreviazione di [file descriptor](https://en.wikipedia.org/wiki/File_descriptor).

I [file descriptor](https://en.wikipedia.org/wiki/File_descriptor) sono i riferimenti che un processo utilizza per accedere a file, dispositivi, pipe e socket.

Quando un processo possiede una connessione di rete, tra i suoi [file descriptor](https://en.wikipedia.org/wiki/File_descriptor) comparirà anche un riferimento a un socket. Un esempio tipico è:

```text
socket:[123456]
```

Il numero racchiuso tra parentesi quadre è proprio l'[inode](https://en.wikipedia.org/wiki/Inode) del socket.

A questo punto il programma può costruire una mappa che associa ogni [inode](https://en.wikipedia.org/wiki/Inode) al processo proprietario. Successivamente confronta questa mappa con gli [inode](https://en.wikipedia.org/wiki/Inode) trovati nelle connessioni TCP o UDP.

Quando trova una corrispondenza può stabilire con precisione quale processo ha aperto quella connessione.

È questo il passaggio più importante dell'intero software, perché consente di passare da una semplice lista di connessioni a una vista completa che collega attività di rete e applicazioni.

## Gli stati delle connessioni TCP

Oltre agli indirizzi e alle porte, il kernel memorizza anche lo stato di ogni connessione TCP.

TCP è un protocollo orientato alla connessione e ogni comunicazione attraversa diverse fasi durante il proprio ciclo di vita.

Nei file di `/proc` questi stati vengono rappresentati tramite codici numerici che il software traduce in nomi comprensibili.

Tra gli stati più comuni troviamo:

* LISTEN, quando un'applicazione è in attesa di nuove connessioni;
* ESTABLISHED, quando la comunicazione è attiva;
* SYN_SENT e SYN_RECV durante la fase iniziale di apertura della connessione;
* CLOSE_WAIT e FIN_WAIT durante la procedura di chiusura;
* TIME_WAIT, uno stato temporaneo mantenuto dal protocollo per garantire la corretta conclusione della comunicazione.

Osservare questi stati permette di capire molto sul comportamento di un'applicazione e sulle condizioni della rete.

## Perché un approccio del genere è utile

Attraverso la sola lettura di `/proc` è possibile ricostruire una fotografia piuttosto accurata dell'attività di rete del sistema, identificando quali programmi stanno comunicando, quali porte sono in ascolto e quali connessioni risultano attive in un determinato momento.

Questo tipo di informazioni è utile sia durante lo sviluppo software sia nelle attività di amministrazione dei sistemi.

Ad esempio, può aiutare a individuare un servizio che occupa una porta già utilizzata, a verificare se un'applicazione sta comunicando correttamente con un server remoto o a diagnosticare problemi legati a connessioni che non vengono chiuse correttamente.

## Un concetto utilizzato anche nella sicurezza informatica

Gli stessi principi vengono utilizzati da molti strumenti professionali di monitoraggio e analisi forense.

La possibilità di associare una connessione a un processo permette infatti di comprendere rapidamente il comportamento del sistema e di individuare eventuali anomalie.

Ad esempio, un amministratore potrebbe notare un servizio inatteso in ascolto su una porta sconosciuta oppure un processo che mantiene connessioni verso destinazioni insolite.

Naturalmente il software non è in grado di stabilire autonomamente se un'attività sia legittima o malevola. Fornisce però una visibilità dettagliata sulle comunicazioni del sistema, lasciando all'analista il compito di interpretare le informazioni raccolte.

Se desideri sperimentare in prima persona questi meccanismi e vedere come vengono tradotti in pratica, puoi trovare una versione base di questo monitor di rete, scritta interamente in Go, disponibile sul nostro [GitHub](https://github.com/alphacops/wcct).