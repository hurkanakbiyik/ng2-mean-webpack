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

  io.sockets.on('connect', (socket) => {

    console.log('a user connected');

    socket.on('disconnect', () => {

      console.log('a user disconnected');
    });
  });

  io.set("origins", "*:*");

  var currentPrice = 99;

  io.on('connection', function (socket) {
    socket.emit('priceUpdate',currentPrice);
    socket.on('bid', function (data) {
      currentPrice = parseInt(data);
      socket.emit('priceUpdate',currentPrice);
      socket.broadcast.emit('priceUpdate',currentPrice);
    });
  });

};
