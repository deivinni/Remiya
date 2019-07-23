const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=lolice&url=${msg.author.displayAvatarURL}`)
        .then(async(r) => {
            msg.delete();
            await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.message))
        })
        msg.channel.stopTyping(true);
    },
    conf:{ enable: true, cooldown: 10 },
    help: {
       name: 'lolice',
       description: 'se torne uma loli policial',
       member: 'usuários',
       category: 'imagens',
       credit: ['[NekoBot API](https://nekobot.xyz/)']
    }
}