const request = require('request-promise-native');
const { RemiyaEmbed, shortenerText } = require('../../../util/functions/index');

module.exports = {
    run: async(msg) => {
        if (!msg.args[0]) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você precisa colocar algo que queira pesquisar no Wikipédia.`);
        let response = await request({
            url: `https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=1&formatversion=2&titles=${msg.args.join(' ')}`,
            json: true
        })
        let thumbnail = '';
        response = response.query.pages[0]
        if (response.missing) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possivel encontrar nada sobre \`${msg.args.join(' ')}\`.`);
        thumbnail = response.thumbnail ? response.thumbnail.source : '';
        msg.channel.send(
            new RemiyaEmbed()
            .setAuthor('Wikipédia', msg.bot.user.displayAvatarURL, response.fullurl)
            .addField(response.title || msg.args.join(' '), `${response.extract.length < 1000 ? shortenerText(response.extract, 950) : shortenerText(response.extract, 950)}...\n**[Ler mais](${response.fullurl})**`)
            .setImage(thumbnail)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png')
        )
    },
    conf:{ aliases: ['wiki','wikipedia'], enable: true, cooldown: 10 },
    help: {
        name: 'wikipédia',
        description: 'pesquise algo no wikipédia',
        usage: ['wikipédia <pesquisa>'],
        member: 'usuários',
        category: 'search',
        credit: ['[Wikipédia](https://pt.wikipedia.org/)','[BastionBot](https://github.com/TheBastionBot/Bastion)']
    }
}