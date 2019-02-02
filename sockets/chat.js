module.exports = (io, socket, onlineUsers) => {

    //listen on "new user" socket emits
    // Now whenever the client emits a "new user" request, our server will be on it.
    socket.on('new user', (username) => {
        // Send the username to all clients currently connected
        onlineUsers[username] = socket.id;
        //Save the username to socket as well. This is important for later.
        socket["username"] = username;
        console.log(`${username} has joined the chat!`);
        io.emit("new user", username);

        // io.emit sends data to all clients on the connection.
        // socket.emit sends data to the client that sent the original data to the server.
    })

    //Listen for new messages
    socket.on('new message', (data) => {
        //send data back to all clients
        console.log(`${data.sender}: ${data.message}`);
        io.emit('new message', data);
    })

    socket.on('get online users', () => {
      //Send over the onlineUsers
      socket.emit('get online users', onlineUsers);
    })

    // socket.on("disconnect") is a special listener that fires when a user exits out of the application.
    //This fires when a user closes out of the application
    socket.on('disconnect', () => {
      //This deletes the user by using the username we saved to the socket
      delete onlineUsers[socket.username]
      io.emit('user has left', onlineUsers);
    });

    socket.on('new channel', (newChannel) => {
        console.log(newChannel);
    })



}
