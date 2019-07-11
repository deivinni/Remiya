module.exports = {
    run: async(msg) => {
        const image = msg.args.join(' ') || msg.author.displayAvatarURL;
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=threats&url=${image}`)
        .then(async(r) => {
            msg.delete();
            await msg.channel.send({
                embed:{
                    image: {url: r.body.message},
                    footer: {
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
       name: 'threats',
       description: 'mostre as 3 maiores ameaças do planeta',
       usage: ['threats [imagem]'],
       member: 'usuários',
       category: 'imagens'
    }
}