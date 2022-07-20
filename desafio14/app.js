const express = require('express');
const path = require('path');
const moment = require('moment');
const{Server : HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const serverRoutes = require('./routes/index');
const chatController = require('./components/chat/ChatController');
const normalizar = require('./normalizr/index');
const {config} = require('./config/db');
const{mongodb} = require('./config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { yargsObj } = require('./utils/yargs');






// Iniciar
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Session
app.use(
    session({
        store:MongoStore.create({
            mongoUrl: mongodb.URL,
            mongoOptions: mongodb.options,
        }),
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 1000,
        },
        rolling: true,
    })
);

// Routes
serverRoutes(app);

// Socket
io.on('connection', async (socket) => {
    console.log('a user connected');

    socket.emit('messages', normalizar(await chatController.listAll()));

    socket.on('message', async (message) => {
        const {author, text} = message;
        const newMessage ={
            author,
            text,
            fecha: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        };
        await chatController.save({
            author: newMessage.author,
            text: newMessage.text,
            fecha: newMessage.fecha,
        });
        io.sockets.emit('message', newMessage);
    });

})


// Servidor
const PORT = yargsObj.port;

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


server.on('error', (err) => {
    console.log(`Error: ${err.message}`);
});