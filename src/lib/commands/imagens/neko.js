const { get } = require('snekfetch');
const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        const embed = new RemiyaEmbed(msg.author)
        .setDescription(`Reaja em ${msg.config.e_men.reload_} para trocar a imagem.`)
        let get_image = msg.args[0] == '--gif' ? msg.config.get_images.nekos.sfw.nekoGif : msg.config.get_images.nekos.sfw.neko
        get(get_image).then(r => {
            msg.channel.send(embed.setImage(r.body.url)).then(message => {
                message.react(msg.config.e_id.reload_)
                const collector = message.createReactionCollector((r,u) => r.emoji.id === msg.config.e_id.reload_ && u.id == msg.author.id, {time: 60000});
                collector.on('collect', (r) => {
                    switch (r.emoji.id) {
                        case msg.config.e_id.reload_:
                            get(get_image).then(r1 => {
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
    conf:{ enable: true, cooldown: 60 },
    help: {
        name: 'neko',
        description: 'veja umas imagens de nekos',
        usage: ['neko [--gif]'],
        member: 'usuários',
        category: 'imagens',
        credit: ['[Nekos.life](https://nekos.life/)']
    }
}