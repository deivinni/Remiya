const Jimp = require('jimp');

module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você precisa digitar as primeiras palavras do bebê.`);
        if (!msg.args.join(' ').length > 50) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você ultrapassou o limite de 50 caracteres.`);
        msg.channel.startTyping()
        Jimp.read('http://i.imgur.com/xXUtLqH.png', (err, image) => {
            if (err) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, ocorreu um erro ao gerar a imagem, tente novamente mais tarde.`);
            Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(async(font) => {
                image.print(font, 11, 13, `${msg.args.join(' ')[0]}... ${msg.args.join(' ')[0]}...`, 400)
                image.print(font, 19, 290, `${msg.args.join(' ')}`, 320)
                image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                    if (err) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, ocorreu um erro ao gerar a imagem, tente novamente mais tarde.`);
                    msg.channel.send({
                        embed:{
                            image: { url: 'attachment://imagem.png'},
                            color: msg.config.colors.PADRÃO,
                            footer: { icon_url: msg.author.displayAvatarURL, text: msg.author.tag },
                            timestamp: new Date()
                        },
                        files:[
                            { attachment: buffer, name: 'imagem.png' }
                        ]
                    })
                })
            })
        })
        msg.channel.stopTyping()
    },
    conf:{
        aliases: ['primeiras-palavras','pp'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3
    },
    help: {
        name: 'first_words',
        description: 'faça um bebe dizer a sua primeira palavra',
        usage: ['first_word <palavras>'],
        member: 'usuários',
        category: 'diversão'
    }
}