const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=baguette&url=${msg.author.displayAvatarURL}`)
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
       name: 'baguette',
       description: 'faça uma imagem de você comendo baguette',
       usage: ['baguette'],
       member: 'usuários',
       category: 'imagens'
    }
}