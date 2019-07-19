const request = require('request-promise-native');
const cheerio = require('cheerio');
const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        try {
            if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, digite algo que queira pesquisar.`);
            let response = await request({
                headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:68.0) Gecko/20100101 Firefox/68.0' },
                url: 'http://google.com/search',
                qs: { q: msg.args.join(' '), safe: 'active' }
            });
            let $ = cheerio.load(response);
            let results = [];
            $('.g').each(i => {
                results[i] = {};
            });
            $('.g .r a h3').each((i,e) => {
                let link = e.parent.attribs['href'];
                results[i]['name'] = `${getText(e)}\n${link}`;
            });
            $('.g .s .st').each((i, e) => {
                results[i]['value'] = getText(e);
            });
            await msg.channel.send(
                new RemiyaEmbed(msg.author)
                .setAuthor(`Resultados de ${msg.args.join(' ')}`, 'https://discordemoji.com/assets/emoji/Google_Logo.png', `https://www.google.com/search?q=${encodeURIComponent(msg.args.join(' '))}`)
                .addField(results.filter(r => r.name)[0], results.filter(r => r.value)[0])
                .addField(results.filter(r => r.name)[1], results.filter(r => r.value)[1])
                .addField(results.filter(r => r.name)[2], results.filter(r => r.value)[2])
                .addField(results.filter(r => r.name)[3], results.filter(r => r.value)[3])
                .addField(results.filter(r => r.name)[4], results.filter(r => r.value)[4])
            );
        } catch (e) {
            msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, ocorreu um erro inesperado ao executar este comando. Tente novamente mais tarde!`)
        }
    },
    conf:{
        aliases: ['go'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 10
    },
    help: {
        name: 'google',
        description: 'pesquise algo no google.',
        usage: ['google <pesquisa>'],
        member: 'usuários',
        category: 'search'
    }
}
function getText(children) {
    if (children.children) return getText(children.children);
    return children.map(c => {
        return c.children ? getText(c.children) : c.data;
    }).join('');
}