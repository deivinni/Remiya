const { Client, Collection } = require('discord.js');
const bot = new Client({ messageCacheMaxSize: 1000 });
['commands','aliases','cooldowns'].forEach(x => bot[x] = new Collection());
['initializeCommands','initializeEvents'].forEach(x => require(`./structure/${x}`)(bot));
bot.login(process.env.TOKEN);