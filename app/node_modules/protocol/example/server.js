'use strict'

const server = require('net').createServer()
const protocol = require('./protocol')

/*
 * An abstraction called DataHandler. In your use case, this will be your server
 * or client. In this case, this server responds with a 'connack' packet when
 * a 'connect' packet has been received.
 *
 * This string value is derived from four bits. If the value of those four bits
 * equals 1, the dictionary attached translates it to 'connect'. So basically,
 * this checks if the first four bits hold a value of one. View the protocol.js
 * file for a deeper understanding.
 *
 * Parse() reads a Buffer input and transforms it to an Object, ready to be
 * processed by your client or server.
 *
 * Generate() reads an Object input and transforms it to a Buffer, ready to be
 * sent by your Socket (connection to another client or server)
 */

class DataHandler {
  handleData (socket, data) {
    if (protocol.parse(data).control === 'connect') {
      const response = { control: 'connack' }
      socket.write(protocol.generate(response))
    }
  }
}

const myHandler = new DataHandler()

/* Open a port, which will forward the data to our DataHandler */
server.listen(1883)
server.on('connection', function (socket) {
  socket.on('data', (data) => { myHandler.handleData(socket, data) })
})
