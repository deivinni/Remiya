const { RichEmbed } = require('discord.js');

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]) || msg.author;
        const avatar = member.displayAvatarURL;
        if (avatar.endsWith('.gif')) avatar = `${memer.displayAvatarURL}?size=2048`;
        msg.channel.send(
            new RichEmbed()
            .setDescription(`${msg.config.e_men.instagram} \`|\` Avatar de ${member}`)
            .setImage(avatar)
            .setFooter(msg.author.tag, msg.author.displayAvatarURL)
            .setColor(msg.config.colors.padrão)
        )
    },
    conf: {
        aliases: ['pic','foto'],
        nsfw: false,
        ownerOnly: false,
        guildOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 5,
        helper: {
            name: 'avatar',
            description: 'veja o avatar de alguém do servidor',
            usage: ['avatar', 'avatar @usuário'],
            category: 'utilidades',
            member: 'usuários'
        }
    }
}