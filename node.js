const Max = require('max-api');

// Handler per i messaggi
Max.addHandler("play", () => {
    Max.post("Play message ricevuto");
    // Invia il messaggio "play" al server WebSocket
    sendMessage('play');
});

Max.addHandler("pause", () => {
    Max.post("Pause message ricevuto");
    // Invia il messaggio "pause" al server WebSocket
    sendMessage('pause');
});

Max.addHandler("start", () => {
    Max.post("Start message ricevuto");
    // Puoi aggiungere logica per avviare il processo
});

Max.addHandler("stop", () => {
    Max.post("Stop message ricevuto");
    // Puoi aggiungere logica per fermare il processo
});

// Funzione per inviare messaggi al server WebSocket
function sendMessage(msg) {
    const ws = new WebSocket('ws://localhost:3000');
    ws.on('open', function() {
        ws.send(msg);  // Invia il messaggio ricevuto da Max al server
    });
}
