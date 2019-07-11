module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar uma mensagem que desaja comentar no pornhub.`);
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${msg.author.displayAvatarURL}&username=${msg.author.username}&text=${msg.args.join(' ')}`)
        .then(async(r) => {
            msg.delete();
            await msg.channel.send({
                embed:{
                    image: {url: r.body.message},
                    footer:{
                        icon_url: msg.author.displayAvatarURL,
                        text: msg.author.tag
                    },
                    timestamp: new Date(),
                    color: msg.config.colors.padrão
                }
            })
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
        cooldown: 3
    },
    help: {
       name: 'pornhub',
       description: 'faça um comentario no pornhub.',
       usage: ['imagens <mensagem>'],
       member: 'usuários',
       category: 'imagens'
    }
}