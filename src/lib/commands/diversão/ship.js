module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.first();
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, favor mencione **uma pessoa** para shipar com você.`);
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=ship&user1=${member.displayAvatarURL}&user2=${msg.author.displayAvatarURL}`)
        .then(async(r) => {
            await msg.channel.send({
                embed:{
                    image: {url: r.body.message},
                    color: msg.config.colors.padrão,
                    footer: {
                        icon_url: msg.author.displayAvatarURL,
                        text: msg.author.tag
                    },
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
       name: 'ship',
       description: 'faça um ship de você com mais um pessoa.',
       usage: ['ship @usuário'],
       member: 'usuários',
       category: 'diversão'
    }
}