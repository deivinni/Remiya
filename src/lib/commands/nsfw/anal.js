const { get } = require('snekfetch');
const { RemiyaEmbed } = require('../../../util/functions/index');

module.exports = {
    run: async(msg) => {
        const embed = new RemiyaEmbed(msg.author).setDescription(`Reaja em ${msg.config.e_men.reload_} para trocar a imagem.`)
        let get_image = msg.args[0] == '--real' ? 'https://nekobot.xyz/api/image?type=anal' : msg.config.get_images.nekos.nsfw.anal;
        get(get_image).then(r => {
            msg.channel.send(embed.setImage(msg.args[0] == '--real' ? r.body.message : r.body.url)).then(message => {
                message.react(msg.config.e_id.reload_)
                const collector = message.createReactionCollector((r,u) => r.emoji.id === msg.config.e_id.reload_ && u.id == msg.author.id, {time: 60000});
                collector.on('collect', (r) => {
                    switch (r.emoji.id) {
                        case msg.config.e_id.reload_:
                            get(get_image).then(r1 => {
                                r.remove(msg.author.id)
                                message.edit(embed.setImage(msg.args[0] == '--real' ? r1.body.message : r1.body.url))
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
        name: 'anal',
        description: 'veja uns hentais ( ͡° ͜ʖ ͡°)',
        usage: ['anal', 'anal --real'],
        member: 'usuários',
        category: 'nsfw'
    }
}