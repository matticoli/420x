const udp = require('dgram');
const osc = require('osc-min')
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 10080 });
let wsock = null;

wss.on('connection', function connection(ws) {
  console.log( 'received connection:', ws )
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  wsock = ws;
  ws.send(JSON.stringify({}));
});


const sock = udp.createSocket("udp4", function(msg, rinfo) {
  try {
    console.log( osc.fromBuffer( msg ) )
    if(wsock) {
        wsock.send(JSON.stringify(osc.fromBuffer(msg)));
    }
  } catch (error) {
    return console.log( "invalid OSC packet", error )
  }
})
sock.bind(8000)