const { prefix } = require('../../util/config');

module.exports = (bot, guild) => {
    //let regions = {'sydney': 'en-us','us-south': 'en-us','us-west': 'en-us','us-central': 'en-us','us-east': 'en-us','brazil': 'pt-br'};
    //let database = require('firebase').database();
    bot.user.setPresence({
        status:'online',
        game:{
            name: `${prefix}help | ${bot.users.size} usuários!`,
            type: 'STREAMING',
            url: 'https://www.twitch.tv/deivinni_'
        }
    })
    /*database.ref(`Guilds/${guild.id}`).set({
        lang: regions[guild.region],
        prefix: config.prefix,
        leveis: true
    })
    database.ref(`Guilds/${guild.id}/channel_command`).set({enable:false,id:''})
    database.ref(`Guilds/${guild.id}/channel_level`).set({enable:false,id:''})*/
}