const express = require("express");
const https = require("https");
const fs = require("fs");
const WebSocket = require("ws");

const app = express();

// Configurazione certificati SSL
const options = {
    key: fs.readFileSync("/path/to/your/ssl/privkey.pem"), // Cambia con il percorso corretto
    cert: fs.readFileSync("/path/to/your/ssl/fullchain.pem"), // Cambia con il percorso corretto
};

// Creazione server HTTPS
const server = https.createServer(options, app);

// Inizializzazione WebSocket
const wss = new WebSocket.Server({ server });

// Configurare il server per servire file statici
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Gestione WebSocket
wss.on("connection", (ws) => {
    console.log("Connessione WebSocket stabilita");

    ws.on("message", (message) => {
        console.log("Messaggio ricevuto:", message);
        if (message === "initializeMedia") {
            ws.send("initializeMedia");
        } else if (message === "playAudio") {
            ws.send("playAudio");
        } else if (message === "playVideo") {
            ws.send("playVideo");
        } else if (message === "pauseAudio") {
            ws.send("pauseAudio");
        } else if (message === "pauseVideo") {
            ws.send("pauseVideo");
        }
    });

    ws.on("close", () => {
        console.log("Connessione WebSocket chiusa");
    });
});

// Aggiunta di endpoint per comandi da Max MSP
app.get("/performance/playAudio", (req, res) => {
    console.log("Comando playAudio ricevuto via HTTP");
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send("playAudio");
        }
    });
    res.sendStatus(200);
});

app.get("/performance/playVideo", (req, res) => {
    console.log("Comando playVideo ricevuto via HTTP");
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send("playVideo");
        }
    });
    res.sendStatus(200);
});

// Porta del server
const PORT = 443; // HTTPS standard
server.listen(PORT, () => {
    console.log(`Server HTTPS in esecuzione su https://www.associazioneorigami.it:${PORT}`);
});

