const { get } = require('snekfetch');

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]);
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, mencione alguém so servidor para acariciar.`);
        get(msg.config.get_images.nekos.sfw.pat).then(r => {
            msg.channel.send({
                embed:{
                    color: msg.config.colors.padrão,
                    description: `<:pat_:588095982244331520> \`|\` ${msg.author}, acariciou ${member}.`,
                    image: {url: r.body.url},
                    footer:{
                        icon_url: msg.author.displayAvatarURL,
                        text: msg.author.tag
                    },
                    timestamp: new Date()
                }
            })
        })
    },
    conf:{
        aliases: ['acariciar'],
        nsfw: false,
        guildOnly: true,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3
    },
    help: {
        name: 'pat',
        description: 'acaricie alguém do servidor',
        usage: ['pat @usuário'],
        member: 'usuários',
        category: 'imagens'
    }
}