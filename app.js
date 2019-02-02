const express = require('express');
const app = express();
const server = require('http').Server(app);


//Socket.io
const io = require('socket.io')(server);
//We'll store our online users here (locally)

// Each socket has a unique ID that identifies it as a unique connected user. So we can make this ID do double duty to identify our users.
let onlineUsers = {};

// io.on("connection") is a special listener that fires whenever a new client connects.
io.on('connection', (socket) => {
      // This file will be read on new socket connections
    // Make sure to send the users to our chat file
    require('./sockets/chat.js')(io, socket, onlineUsers);
})

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Establish your public folder
app.use('/public', express.static('public'));



app.get('/', (req, res) => {
    res.render('index.handlebars');
})

server.listen('3000', () => {
    console.log('Server listening on Port 3000');
})
