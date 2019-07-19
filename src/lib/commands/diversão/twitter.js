const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        if (!msg.args[0]) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar o \`@\` de uma conta do Twiiter.`);
        if (!msg.args.slice(1).join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar alguma mensagem para tweetar.`);
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=tweet&username=${msg.args[0].replace('@','')}&text=${msg.args.slice(1).join(' ')}`)
        .then(async(r) => {
            msg.delete();
            await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.message))
        })
        msg.channel.stopTyping(true);
    },
    conf:{
        aliases: ['tweet'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 10
    },
    help: {
       name: 'twitter',
       description: 'gera uma imagem com alguma mensagem no Twitter.',
       usage: ['twitter <TwitterUsername> <mensagem>'],
       member: 'usuários',
       category: 'diversão'
    }
}