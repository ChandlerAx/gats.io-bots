const fs = require("fs");
const readline = require("readline");
const WebSocket = require("ws");
const { SocksProxyAgent } = require("socks-proxy-agent");

// open packets
// ('k,6,1'); // Fire-shoot
// ('k,3,1'); // Walk down
// ('s,1,3,5'); // Respawn/Spawn
// ('k,1,1'); // Walk right
// ('k,2,1'); // Walk up
// ('k,0,1'); // Walk left

// to get servers press f12 and find the server elements (includes websocket servers)
const servers = [
 "gat-eu-central-gd6yr.io-8.com/6b048d40-42e9-48b8-a038-12261a2a5404",
];

let proxies = [];

const IF_READER = readline.createInterface({
  input: fs.createReadStream("socks5.txt"),
  output: process.stdout,
  console: false
});

IF_READER.on("line", function(line) {
  proxies.push(line.trim());
});

function host_system() {
  const this_proxy = proxies[Math.floor(Math.random() * proxies.length)];
  const agent = new SocksProxyAgent(this_proxy);

  const ws = new WebSocket(`wss://${servers[Math.floor(Math.random() * servers.length)]}`, {
    rejectUnauthorized: false,
    headers: {
      "User-Agent": "Mozilla/5.0",
      Origin: "https://gats.io"
    },
    agent: agent
  });

  ws.binaryType = "arraybuffer"; // arraybuffer based encoding

  ws.on("open", function open() {
    ws.send(`s,3,3,3`); // gun armor color
    ws.send(`k,2,1`);
    ws.send(`k,1,1`);
    ws.send(`k,6,1`);
    ws.send(`c,Zombie killers Beta V1`);
    ws.close();
  });
  
  ws.on("error", function error(err) {});
  
}


IF_READER.on("close", function() {
  setInterval(host_system, 0);
});
