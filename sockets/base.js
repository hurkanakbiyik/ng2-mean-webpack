// ```
// base.js
// (c) 2015 David Newman
// blackshuriken@hotmail.com
// base.js may be freely distributed under the MIT license
// ```

// *base.js*

// This file contains the most basic functionality for server Socket.io
// functionality.

export default (io) => {
  console.log("here");
  io.on('connection', function (socket) {
    console.log("here 2");
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

  io.sockets.on('connect', (socket) => {

    console.log('a user connected');

    socket.on('disconnect', () => {

      console.log('a user disconnected');
    });
  });
};
