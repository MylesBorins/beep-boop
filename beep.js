const dgram = require('dgram');
const crypto = require('crypto');
const client = dgram.createSocket('udp4');
const id = crypto.randomBytes(20).toString('hex');
const message = Buffer.from(id);

setInterval(_ => {
  client.send(message, 0, message.length, 12345, '224.0.0.1');
}, 250)
