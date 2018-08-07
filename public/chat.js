// Membuat koneksi ke server
var socket = io.connect("http://localhost:4000/");

let message = document.getElementById('message');
let handle = document.getElementById('hanlde');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

//Event emit ke server atau memancarkan data ke serve index.js
btn.addEventListener('click',function(){
  socket.emit('chat',{
    message:message.value,
    handle:hanlde.value,
  });
   message.value = "";
});

message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value);
});

//Event dari sever index.js
socket.on('chat',(data)=>{
  feedback.innerHTML = '';
  output.innerHTML += "<p><strong>"+data.handle+":</strong>"+data.message+'</p>';
});

socket.on('typing',(data)=>{
   feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
