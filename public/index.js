//index.js
$(document).ready(()=>{
  const socket = io.connect();

  //Keep track of the current user
  let currentUser;

  $('#createUserBtn').click((e)=>{
    e.preventDefault();
    if($('#usernameInput').val().length > 0){
      socket.emit('new user', $('#usernameInput').val());
      // Save the current user when created
      currentUser = $('#usernameInput').val();
      $('.usernameForm').remove();
      $('.mainContainer').css('display', 'flex');
    }
  });

  $('#sendChatBtn').click((e) =>{
      e.preventDefault();
      //Get the default text
      let message = $('#chatInput').val();
      //Make sure its not empty
      if(message.length > 0){
          //Emit the message with the current user to the server
          socket.emit('new message', {
              sender: currentUser,
              message: message
          });
          $('#chatInput').val("");

      }
  });

  //socket listeners
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat`);
    // Add the new user to the online users div
    $('.usersOnline').append(`<div class="userOnline">${username}</div>`);
  })

  // Output the new message
  socket.on('new message', (data) => {
      $('.messageContainer').append(`
          <div class= "message">
            <p class="messageUser">${data.sender}:</p>
            <p class="messageTest">${data.message}</p>
        </div>`)
  })

})
