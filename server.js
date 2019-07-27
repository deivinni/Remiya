const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const { ShardingManager } = require('discord.js');
const shards = new ShardingManager('./src/main.js', {
    totalShards: 'auto',
    respawn: true,
    token: process.env.TOKEN
});

shards.spawn();
shards.on('launch', async (shard) => {
    try { console.log(`[SHARD] - ${shard.id == 0 ? '1 shard carregado.' : `${shard.id+1} shards carregados.`}`) } 
    catch (e) { console.error(e) } 
});