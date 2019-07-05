module.exports = {
    run: async(msg) => {
        if (!msg.args[0]) {
            msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, coloque algo para Donald Trump tornar ilegal.`);
        } else {
            if (msg.args[0].length > 6) {
                msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, a palavra não pode ultrapassar de 6 letras.`);
            } else {
                const ilegal_gif = `https://storage.googleapis.com/is-now-illegal.appspot.com/gifs/${msg.args[0].toUpperCase()}.gif`;
                if (!ilegal_gif) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possivel encontrar o gif sobre \`${msg.args[0]}\`.`);
                msg.channel.send({
                    embed: {
                        color: msg.config.colors.padrão,
                        description: `${msg.config.e_men._trump} \`|\` Donal Trump, tornou ${msg.args[0]} ilegal.`,
                        image: ilegal_gif,
                        footer:{
                            icon_url: msg.author.displayAvatarURL,
                            text: msg.author.tag
                        },
                        timestamp: new Date()
                    }
                })
            }
        }
    },
    conf:{
        aliases: ['ilegal'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3,
        helper: {
            name: 'trump',
            description: 'faça o Donald Trump tornar algo ilegal',
            usage: ['trump <qualquer palavra de no máximo 6 letras>'],
            member: 'usuários',
            category: 'imagens'
        }
    }
}