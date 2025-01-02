const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const path = require('path');

console.log('Inizio lettura dei certificati SSL');

// Leggi i certificati SSL auto-generati
const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'certificate.crt'), 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate
};

console.log('Certificati SSL letti correttamente');

// Creare il server HTTPS per servire il file HTML
const server = https.createServer(credentials, (req, res) => {
    console.log('Ricevuta richiesta per', req.url);
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.mp4':
            contentType = 'video/mp4';
            break;
        case '.mp3':
            contentType = 'audio/mpeg';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (error, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

// Creare il server WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('Nuova connessione WebSocket stabilita');
    
    ws.on('message', function incoming(message) {
        console.log('Messaggio ricevuto:', message);
        
        // Invia il messaggio a tutti i client connessi
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.send('Benvenuto al server WebSocket!');
});

server.listen(8082, () => {
    console.log('Server in ascolto sulla porta 8082');
});
