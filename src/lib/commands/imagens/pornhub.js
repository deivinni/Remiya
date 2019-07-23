const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar uma mensagem que desaja comentar no pornhub.`);
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${msg.author.displayAvatarURL}&username=${msg.author.username}&text=${msg.args.join(' ')}`)
        .then(async(r) => {
            msg.delete();
            await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.message))
        })
        msg.channel.stopTyping(true);
    },
    conf:{ enable: true, cooldown: 10 },
    help: {
       name: 'pornhub',
       description: 'faça um comentario no pornhub.',
       usage: ['imagens <mensagem>'],
       member: 'usuários',
       category: 'imagens',
       credit: ['[NekoBot API](https://nekobot.xyz/)']
    }
}