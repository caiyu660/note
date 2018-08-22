var ws = require('ws');

const WebSocketServer = ws.Server;

const wss = new WebSocketServer({
    port: 3000
});

wss.on("connection", (ws)=>{
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        // ws.send(`${message}`, (err) => {
        //     if (err) {
        //         console.log(`[SERVER] error: ${err}`);
        //     }
        // });
        broadcast(message)
    })
})

function broadcast(msg){
    wss.clients.forEach((client)=>{
        client.send(msg)
    })
}
