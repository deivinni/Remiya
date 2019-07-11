const { get } = require('snekfetch');

module.exports = {
    run: async(msg) => {
        const embed = new (require('discord.js').RichEmbed)()
        .setDescription(`Reaja em ${msg.config.e_men.reload_2} para trocar a imagem.`)
        .setColor(msg.config.colors.padrão)
        .setFooter(msg.author.tag, msg.author.displayAvatarURL)
        .setTimestamp();
        let get_image;
        if (msg.args[0] == '--art') get_image = msg.config.get_images.nekos.nsfw.cumArts;
        if (!msg.args[0])           get_image = msg.config.get_images.nekos.nsfw.cumsluts;
        get(get_image).then(r => {
            msg.channel.send(embed.setImage(r.body.url)).then(message => {
                message.react(msg.config.e_id.reload_2)
                const collector = message.createReactionCollector((r,u) => (r.emoji.id === msg.config.e_id.reload_2) && (u.id != msg.bot.user.id && u.id == msg.author.id), {time: 60000});
                collector.on('collect', (r) => {
                    switch (r.emoji.id) {
                        case msg.config.e_id.reload_2:
                            get(cumArts).then(r1 => {
                                r.remove(msg.author.id)
                                message.edit(embed.setImage(r1.body.url))
                            })
                        break;
                    }
                })
                setTimeout(() => {
                    message.edit(embed.setDescription(''))
                    message.clearReactions();
                }, 60000)
            })
        })
    },
    conf:{
        aliases: [],
        nsfw: true,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 60
    },
    help: {
        name: 'cum',
        description: 'veja uns hentais ( ͡° ͜ʖ ͡°)',
        usage: ['cum', 'cum --art'],
        member: 'usuários',
        category: 'nsfw'
    }
}