// CLIENTE
const socket = io();

 let message = document.getElementById('message');
 let username = document.getElementById('username');
 let button = document.getElementById('send');
 let output = document.getElementById('output');
 let actions = document.getElementById('actions');


button.addEventListener('click', ()=>{
    // creo un evento y envío datos al servidor
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    });
});

// envío el nombre del usuario al momento que éste está tipeando
message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', username.value)
});

// escucho el evento que envía desde el servidor quién está tipeando
socket.on('chat:typing', (data)=>{
    actions.innerHTML = `<p><em>${data} is typing...</em></p>`

})

// escucho el evento que me envía el servidor, en este caso, {usuario y mensaje}
socket.on('chat:message', (data)=>{
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong> : ${data.message}    
    </p>`
})