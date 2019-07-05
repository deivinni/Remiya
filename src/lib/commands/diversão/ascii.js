const { font } = require('ascii-art');

module.exports = {
    run: async(msg) => {
        font(msg.args.join(' '), 'Doom', function(rendered){
            rendered = rendered.trimRight();
            if (rendered.length > 2000) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, esta mensagem é muito longa.`);
            msg.channel.send(rendered, {code: 'md'});
        })
    },
    conf:{
        aliases: [],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3,
        helper: {
            name: 'ascii',
            description: 'crie uma mensagem ascii',
            usage: ['ascii <frase>'],
            member: 'usuários',
            category: 'diversão'
        }
    }
}