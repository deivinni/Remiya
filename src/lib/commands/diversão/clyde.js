module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar a mensagem.`);
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=clyde&text=${msg.args.join(' ')}`)
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
        cooldown: 10
    },
    help: {
       name: 'clyde',
       description: 'faça o clyde enviar uma mensagem para você',
       usage: ['clyde <mensagem>'],
       member: 'usuários',
       category: 'diversão'
    }
}