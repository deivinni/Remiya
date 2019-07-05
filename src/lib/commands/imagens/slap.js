const { get } = require('snekfetch');

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]);
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve mencionar alguém para dar um tapa.`);
        get(msg.config.get_images.nekos.sfw.slap).then(r => {
            msg.channel.send({
                embed:{
                    description: `<:slap_:589433427774930956> \`|\` ${msg.author}, deu um tapa em ${member}.`,
                    image: {url: r.body.url},
                    footer: {
                        icon_url: msg.author.displayAvatarURL, 
                        text: msg.author.tag
                    },
                    timestamp: new Date(),
                    color: msg.config.colors.padrão
                }
            })
        })        
    },
    conf:{
        aliases: ['bater'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3,
        helper: {
            name: 'slap',
            description: 'bata em alguém usuário',
            usage: ['slap @usuário'],
            member: 'usuários',
            category: 'imagens'
        }
    }
}