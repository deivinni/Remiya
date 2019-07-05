const { get } = require('snekfetch');

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]);
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, mencione alguém para fazer cócegas.`)
        get(msg.config.get_images.nekos.sfw.tickle).then(r => {
            msg.channel.send({
                embed:{
                    footer: {
                        icon_url: msg.author.displayAvatarURL, 
                        text:msg.author.tag
                    },
                    timestamp: new Date(),
                    image: {url: r.body.url},
                    color: msg.config.colors.padrão,
                    description: `${msg.author}, fez cócegas em ${member}`
                }
            })
        })       
    },
    conf:{
        aliases: ['cócegas'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3,
        helper: {
            name: 'tickle',
            description: 'faça cócegas em alguém',
            usage: ['tickle @usuário'],
            member: 'usuários',
            category: 'imagens'
        }
    }
}