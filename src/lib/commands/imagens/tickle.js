const { get } = require('snekfetch');
const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.filter(a => a.id != msg.bot.id).first() || msg.bot.users.get(msg.args[0]);
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, mencione alguém para fazer cócegas.`)
        get(msg.config.get_images.nekos.sfw.tickle).then(async(r) => {
            await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.url)
                .setDescription(`${msg.author}, fez cócegas em ${member}`)
            )
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
        cooldown: 3
    },
    help: {
        name: 'tickle',
        description: 'faça cócegas em alguém',
        usage: ['tickle @usuário'],
        member: 'usuários',
        category: 'imagens'
    }
}