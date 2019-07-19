const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        msg.channel.send(
            new RemiyaEmbed(msg.author)
            .setImage('https://cdn.discordapp.com/attachments/587366096839901204/596447280752754708/t-tito.gif')
        )
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
        name: 'tiltado',
        description: 'tá tiltado?!',
        usage: ['tiltado'],
        member: 'usuários',
        category: 'diversão'
    }
}