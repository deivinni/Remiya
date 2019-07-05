const moment = require('moment');
require('moment-duration-format');
moment.locale('pt-BR');

module.exports = {
    run: async(msg) => {
        let duration = moment.duration(msg.bot.uptime).format('`D` [d], `H` [h], `m` [min], `s` [segs]');
        msg.channel.send(`${msg.config.e_men.timer} \`|\` ${msg.author}, estou online à ${duration}`);
    },
    conf:{
        aliases: ['ontime'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3,
        helper: {
            name: 'uptime',
            description: 'veja o tempo em que estou online',
            usage: ['uptime'],
            member: 'usuários',
            category: 'informações'
        }
    }
}