// server.js
const fs = require('fs');
const path = require('path');
const https = require('https');
const WebSocket = require('ws');
const express = require('express');

const app = express();
const port = process.env.PORT || 443;

// Configure WebSocket server
const server = https.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('New client connected');
  ws.on('message', message => {
    console.log('Received message:', message);
    // Broadcast the message to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
