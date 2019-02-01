module.exports = (io, socket) => {

    //listen on "new user" socket emits
    // Now whenever the client emits a "new user" request, our server will be on it.
    socket.on('new user', (username) => {
        console.log(`${username} has joined the chat!`);
        // Send the username to all clients currently connected
        io.emit("new user", username);

        // io.emit sends data to all clients on the connection.
        // socket.emit sends data to the client that sent the original data to the server.
    })
}
