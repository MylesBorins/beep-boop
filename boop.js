const dgram = require('dgram');
const server = dgram.createSocket('udp4');

var registry = {};

function joined(msg, rinfo) {
  console.log(`${msg} discovered from ${rinfo.address}:${rinfo.port}`);
}

function parted(msg) {
  console.log(`${msg} has left the building`);
}

function cleanUp() {
  for (var key in registry) {
    if (registry[key] && Date.now() - registry[key] > 1500) {
      parted(key);
      registry[key] = null;
    }
  }
}

setInterval(cleanUp, 1500);

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  if (!registry[msg]) {
    joined(msg, rinfo)
  }
  registry[msg] = Date.now();
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(12345);
// server listening 0.0.0.0:12345
