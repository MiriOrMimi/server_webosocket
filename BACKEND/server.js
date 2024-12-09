const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server,{
    cors: {
        origin:'*',
    }
});

io.on('connection', socket =>{
    console.log('client connesso')

    socket.on('disconnect', (data) => {
        console.log('client disconnesso');
    });

    socket.on('sendMessage', (data) => {
        console.log(`messaggio ricevuto: ${data}`);
        io.emit('message', data);
    });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT,'10.1.0.6', () => {
    console.log(`server in ascolto alla porta: ${PORT}`);
});


