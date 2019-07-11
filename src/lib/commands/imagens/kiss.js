const { get } = require('snekfetch');

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]);
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, mencione alguém so servidor para beijar.`);
        get(msg.config.get_images.nekos.sfw.kiss).then(r => {
            msg.channel.send({
                embed: {
                    color: msg.config.colors.padrão,
                    description: `<a:kiss_:588097512376631317> \`|\` ${msg.author}, beijou ${member}.`,
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
        aliases: ['beijar'],
        nsfw: false,
        guildOnly: true,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3
    },
    help: {
        name: 'kiss',
        description: 'beija alguém do servidor',
        usage: ['kiss @usuário'],
        member: 'usuários',
        category: 'imagens'
    }
}