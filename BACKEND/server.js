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
    var currenRoom = "";

    socket.on('disconnect', (data) => { 
        console.log('client disconnesso');
    });

    socket.on('sendMessage', (data) => {
       switch(currenRoom){
        case "" || "broadcast":
            socket.broadcast.emit('message', data)
            break;
        default:
            io.to(currenRoom).emit("message", data)
       }
    });

    //   socket.on('sendMessage', (data) => {
    //     socket.broadcast.emit('message', data)
    // })

    socket.on('join-room', room =>{
        socket.leave(currenRoom);
        socket.join(room);
        console.log("Connessio alla stanza "+room);
        currenRoom = room;
    })

    

});



const PORT = process.env.PORT || 3000;
server.listen(PORT,'10.1.0.6', () => {
    console.log(`server in ascolto alla porta: ${PORT}`);
});


