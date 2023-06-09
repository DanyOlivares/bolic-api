const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 },()=>{
    console.log('server started')
})
wss.on('connection', function connection(ws) {
   ws.on('message', (data) => {
      
      const buffer = Buffer.from(data);
      //const message = buffer.toString('utf8');
      console.log('data received \n %o',data)
      console.log(buffer)
      //console.log('data received ',message)
      ws.send("holaaa");
      //ws.send(message);
      if (data.toString()==="1") {
         ws.send("datos aqui")
      }

   })
})
wss.on('listening',()=>{
   console.log('listening on 8080')
})