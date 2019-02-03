const express = require('express');
const app = express();
const server = require('http').Server(app);




//Socket.io
const io = require('socket.io')(server);
//We'll store our online users here (locally)

// Each socket has a unique ID that identifies it as a unique connected user. So we can make this ID do double duty to identify our users.
let onlineUsers = {};

// We want General channel to be available without having to be created.
// The array value that comes with the channel key will be used to save each channel's messages.
let channels = {"General": []}

// io.on("connection") is a special listener that fires whenever a new client connects.
io.on('connection', (socket) => {
      // This file will be read on new socket connections
    // Make sure to send the users to our chat file
    require('./sockets/chat.js')(io, socket, onlineUsers, channels);
})

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Establish your public folder
app.use('/public', express.static('public'));



app.get('/', (req, res) => {
    res.render('index.handlebars');
})

// server.listen('3000', () => {
//     console.log('Server listening on Port 3000');
// })

server.listen(process.env.PORT || 5000)
