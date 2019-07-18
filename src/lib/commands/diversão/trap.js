module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.filter(a => a.id != msg.bot.id).first();
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, favor mencione uma pessoa para ser sua trap.`);
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=trap&name=${member.username}&author=${msg.author.username}&image=${member.displayAvatarURL}`)
        .then(async(r) => {
            await msg.channel.send({
                embed:{
                    image: { url: r.body.message },
                    color: msg.config.colors.PADRÃO,
                    footer: { icon_url: msg.author.displayAvatarURL, text: msg.author.tag },
                    timestamp: new Date()
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
       name: 'trap',
       description: 'transfome uma pessoa em sua trap card.',
       usage: ['trap @usuário'],
       member: 'usuários',
       category: 'diversão'
    }
}