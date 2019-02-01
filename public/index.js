$(document).ready(() => {
    const socket = io.connect();


    $('#createUserBtn').click((e) => {
        e.preventDefault();
        let username = $('#usernameInput').val();
        if(username.length > 0){
            socket.emit('new user', username);
            $('.usernameForm').remove();
        }
    });

    //socket listeners
    // client to listen for any new user events coming from the server.
    // Now both your server and clients will be logging in the new users.
    socket.on('new user', (username) => {
        console.log(`${username} has joined the chat!`);
    })
})
