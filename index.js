const express = require('express')
const socket = require('socket.io')

// app setup
const app = express()
const server = app.listen(4227, ()=>{
  console.log('listening to requests on port 4227')
})

// static files
app.use(express.static('public'))

// socket setup
const io = socket(server)

io.on('connection', (socket)=>{
  console.log('made socket connection', socket.id)

  // handle chat event
  socket.on('chat', (data)=>{
    io.sockets.emit('chat', data)
  })

  // handle typing event
  socket.on('typing', (data)=>{
    socket.broadcast.emit('typing', data)
  })
})
