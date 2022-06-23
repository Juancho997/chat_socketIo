import express from 'express';
import morgan from 'morgan';
import * as http from 'http';
import { Server } from "socket.io";


const app = express()
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;
 

// app.set("view engine", "ejs");
// app.set("views", "./views");
app.use(express.static('./public'))


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.on('connection', (socket) => {
    console.log('a user connected - ID:', socket.id);

    socket.emit('status', 'Hello from Socket.io');

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

    // socket escucha el evento 'chat:message' que envía el cliente, recibe data y ejecuta una función con ella
    socket.on('chat:message', (data)=>{
        // en este caso, envía data a todos los clientes
        io.sockets.emit('chat:message', data)
    });

    // escucho cuando alguien está tipeando desde el cliente y recibo username.value
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    });
});

server.listen(port, () => {
    console.log(`Server on port ${port}`)
});