require('ylenv').load();
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