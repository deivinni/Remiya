const translate = require('@vitalets/google-translate-api');
const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, coloque um idioma para traduzir e a mensagem.`);
        translate(`${msg.args.slice(1).join(' ')}`, {to: `${msg.args[0]}`}).then(res => {
            msg.delete()
            msg.channel.send(
                new RemiyaEmbed(msg.author)
                .setThumbnail('https://i.redd.it/zurtc1epmh111.gif')
                .setAuthor('Tradutor', msg.bot.user.displayAvatarURL, 'https://translate.google.com/')
                .addField('📥 | Mensagem original', `\`\`\`\n${msg.args.slice(1).join(' ')}\`\`\``)
                .addField('📤 | Mensagem traduzida', `\`\`\`\n${res.text}\`\`\``)
            )
        }).catch(() => msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você inseriu um idioma inválido. Tente colocar a abreviação dele, exemplo: \`Inglês\` -> \`en\``));
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