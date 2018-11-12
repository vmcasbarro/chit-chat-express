const express = require('express')
const socket = require('socket.io')

const PORT = process.env.PORT || 4227

// app setup
const app = express()
const server = app.listen(PORT, ()=>{
  console.log(`listening to requests on port ${PORT}`)
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
