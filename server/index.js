const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log(`Utilisateur connecté: ${socket.id}`);
    console.log('Connection établie avec Socket.');

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`Utilisateur connecté: ${socket.id} joined room: ${data}`);
    });

    socket.on("newMessage", (data) => {
        // console.log(data);
        // to ça envoie juste aux autres utilisateurs
        // socket.to(data.room).emit("receive_message", data);
        // emit ça envoie au user qui a envoyé le message 
        io.emit("receive_message", data);
    });

    socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté.', socket.id);
    })
});

server.listen(3001, () => {
    console.log("Le server est en train de tourner");
});