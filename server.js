require('ylenv').load();
module.exports = require('./src/main.js');
/*const { ShardingManager } = require('discord.js');
const shards = new ShardingManager('./src/main.js', {
    totalShards: 'auto',
    respawn: true,
    token: process.env.TOKEN
});

shards.spawn();
shards.on('launch', async (shard) => {
    try { console.log(`[SHARD] - Shard: ${shard.id+1} carregado.`) } 
    catch (e) { console.error(e) } 
});*/