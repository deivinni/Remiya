const { get } = require('snekfetch');

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.filter(a => a.id != msg.bot.id).first() || msg.bot.users.get(msg.args[0]);
        if (!member) return msg.channel.send(`${msg.config.e_men.errado}, \`|\` ${msg.author}, você deve mencionar o usuário em que deseja abraçar.`);
        get(msg.config.get_images.nekos.sfw.hug).then(async(r) => {
            await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.url)
                .setDescription(`<a:attackHug_:588082982829424640> \`|\` ${msg.author}, abraçou ${member}.`)
            )
        })
    },
    conf:{
        aliases: ['abraçar'],
        nsfw: false,
        guildOnly: true,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3
    },
    help: {
        name: 'hug',
        description: 'abraçe alguém do servidor',
        usage: ['hug @usuário'],
        member: 'usuários',
        category: 'imagens'
    }
}