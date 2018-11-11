// make ws connection
const socket = io.connect('http://localhost:4227')

// query dom
const message = document.getElementById('message')
const  handle = document.getElementById('handle')
const btn = document.getElementById('send')
const output = document.getElementById('chit-chat-output')
const feedback = document.getElementById('chit-chat-feedback')

// emit events
btn.addEventListener('click', ()=>{
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
})

message.addEventListener('keypress', ()=>{
  socket.emit('typing', handle.value)
})

// listen for events
socket.on('chat', (data)=>{
  feedback.innerHTML = ' '
  output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`
})

socket.on('typing', (data)=>{
  feedback.innerHTML = `<p><em>${data} is typing... </em></p>`
})
