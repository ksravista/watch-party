const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require("path");

app.use(express.static("build"));

// app.get("/testing", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

io.on('connection', socket => {
  socket.on('message', ({ play }) => {
    io.emit('message', { play })
  });

  socket.on('urlChange', ({ url }) =>{
    io.emit('urlChange', { url });
  })
})

http.listen(80, function() { 
  console.log('listening on port 80')
})
