module.exports = {
    run: async(msg) => {
        msg.channel.send({
            embed: {
                color: msg.config.colors.padrão,
                image: {url: 'https://cdn.discordapp.com/attachments/587366096839901204/596447280752754708/t-tito.gif'},
                footer:{
                    icon_url: msg.author.displayAvatarURL,
                    text: msg.author.tag
                },
                timestamp: new Date()
            }
        })
    },
    conf:{
        aliases: [],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3,
        helper: {
            name: 'tiltado',
            description: 'tá tiltado?!',
            usage: ['tiltado'],
            member: 'usuários',
            category: 'diversão'
        }
    }
}