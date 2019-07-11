const translate = require('@vitalets/google-translate-api');

module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, coloque um idioma para traduzir e a mensagem.`);
        translate(`${msg.args.slice(1).join(' ')}`, {to: `${msg.args[0]}`}).then(res => {
            msg.delete()
            msg.channel.send({
                embed:{
                    color: 0x4285F4,
                    footer: {
                        icon_url: msg.author.displayAvatarURL,
                        text: msg.author.tag
                    },
                    timestamp: new Date(),
                    thumbnail: {url: 'https://i.redd.it/zurtc1epmh111.gif'},
                    fields: [
                        {
                            name: '📥 | Mensagem original',
                            value: `\`\`\`\n${msg.args.slice(1).join(' ')}\`\`\``,
                            inline: true
                        },{
                            name: '📤 | Mensagem traduzida',
                            value: `\`\`\`\n${res.text}\`\`\``
                        }
                    ],
                    author: {
                        name: 'Tradutor',
                        url: 'https://translate.google.com/',
                        icon_url: msg.bot.user.displayAvatarURL
                    }
                }
            })
        }).catch(() => msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você inseriu um idioma inválido.`));
    },
    conf:{
        aliases: ['translate'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 8
    },
    help: {
        name: 'traduzir',
        description: 'traduza alguma mensagem',
        usage: ['traduzir <língua para traduzir> <mensagem>'],
        member: 'usuários',
        category: 'utilidades'
    }
}