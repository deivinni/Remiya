const { prefix } = require('../../util/config');

module.exports = (bot, guild) => {
    bot.user.setPresence({
        status:'online',
        game:{
            name: `${prefix}help | ${bot.users.size} usuários!`,
            type: 'STREAMING',
            url: 'https://www.twitch.tv/deivinni_'
        }
    })
    //require('firebase').database().ref(`Guilds/${guild.id}`).remove();
}