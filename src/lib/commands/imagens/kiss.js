const { get } = require('snekfetch');
const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.filter(a => a.id != msg.bot.id).first() || msg.bot.users.get(msg.args[0]);
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, mencione alguém so servidor para beijar.`);
        get(msg.config.get_images.nekos.sfw.kiss).then(async(r) => {
            await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.url)
                .setDescription(`<a:kiss_:588097512376631317> \`|\` ${msg.author}, beijou ${member}.`)
            )
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