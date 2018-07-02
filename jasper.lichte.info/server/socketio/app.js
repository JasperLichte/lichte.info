const express = require('express');
const socket = require('socket.io');
const JSON = require('circular-json');

//App setup
const app = express();
const server = app.listen(3001, () => {
    console.log('Listening on port 3001');
});

//Socket setup
let connections = [];
const io = socket(server);
io.on('connection', socket => {
    connections.push(socket);
    console.log('New Connection (' + connections.length + ')');

    socket.on('disconnect', socket => {
        connections.splice(connections.indexOf(socket), 1);
    })

    socket.on('message', data => {
        const message = {
            data : data.substring(0, 300),
            socket : socket
        }
        
        io.sockets.emit('message', JSON.stringify(message));
    })
})