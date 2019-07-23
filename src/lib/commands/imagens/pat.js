const { get } = require('snekfetch');
const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.filter(a => a.id != msg.bot.id).first() || msg.bot.users.get(msg.args[0]);
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, mencione alguém so servidor para acariciar.`);
        get(msg.config.get_images.nekos.sfw.pat).then(async(r) => {
            await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.url)
                .setDescription(`<:pat_:588095982244331520> \`|\` ${msg.author}, acariciou ${member}.`)
            )
        })
    },
    conf:{ aliases: ['acariciar'], enable: true, cooldown: 10 },
    help: {
        name: 'pat',
        description: 'acaricie alguém do servidor',
        usage: ['pat @usuário'],
        member: 'usuários',
        category: 'imagens',
        credit: ['[Nekos.life](https://nekos.life/)']
    }
}