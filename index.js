let express = require('express');
let socket = require('socket.io');

//Setup App
let app = express();
let server = app.listen(5000,()=>{
  console.log("Anda berada di localhost 4000");
});

//Menggunakan folder public
app.use(express.static('public'));

//Setting socket
let io = socket(server);

io.on('connection',(socket)=>{
  console.log("Membuat socket connection", socket.id);
  socket.on('chat',(data)=>{
      //console.log(data.message);
      io.sockets.emit('chat',data);
  });

  socket.on('typing',(data)=>{
    socket.broadcast.emit('typing',data);
    // console.log(data);
  });
});
