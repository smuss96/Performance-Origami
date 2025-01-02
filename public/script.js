const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
    console.log('Connessione WebSocket aperta');
    document.getElementById('status').innerText = 'Connessione WebSocket: Attiva';
};

socket.onmessage = (event) => {
    console.log('Messaggio ricevuto dal server:', event.data);

    if (event.data === 'play') {
        console.log('Avvio della riproduzione');
        const audioElement = document.getElementById('audioElement');
        if (audioElement) audioElement.play();

        const videoElement = document.getElementById('videoElement');
        if (videoElement) videoElement.play();
    }

    if (event.data === 'pause') {
        console.log('Pausa della riproduzione');
        const audioElement = document.getElementById('audioElement');
        if (audioElement) audioElement.pause();

        const videoElement = document.getElementById('videoElement');
        if (videoElement) videoElement.pause();
    }
};

socket.onclose = () => {
    console.log('Connessione WebSocket chiusa');
    document.getElementById('status').innerText = 'Connessione WebSocket: Chiusa';
};

socket.onerror = (error) => {
    console.error('Errore WebSocket:', error);
};

// Invio di comandi al server
document.getElementById('playButton').addEventListener('click', () => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send('play');
    }
});

document.getElementById('pauseButton').addEventListener('click', () => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send('pause');
    }
});
