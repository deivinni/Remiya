const { RemiyaEmbed } = require('../../../util/functions/index');

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]) || msg.author;
        const avatar = member.displayAvatarURL.endsWith('.gif') ? `${memer.displayAvatarURL}?size=2048` : member.displayAvatarURL;
        msg.channel.send(
            new RemiyaEmbed(msg.author)
            .setDescription(`${msg.config.e_men.instagram} \`|\` Avatar de ${member}`)
            .setImage(avatar)
        )
    },
    conf: { aliases: ['pic','foto'], enable: true, cooldown: 10 },
    help: {
        name: 'avatar',
        description: 'veja o avatar de alguém do servidor',
        usage: ['avatar [@usuário]','a'],
        category: 'utilidades',
        member: 'usuários'
    }
}