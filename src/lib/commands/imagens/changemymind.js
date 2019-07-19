const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar uma mensagem.`)
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${msg.args.join(' ')}`)
        .then(async(r) => {
            msg.delete();
            await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.message))
        })
        msg.channel.stopTyping(true);
    },
    conf:{
        aliases: [],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 10
    },
    help: {
       name: 'changemymind',
       description: 'mude de ideia',
       usage: ['changemymind <mensagem>'],
       member: 'usuários',
       category: 'imagens'
    }
}