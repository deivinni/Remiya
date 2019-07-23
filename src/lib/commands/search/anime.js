const moment = require('moment'); moment.locale('pt-BR');
const kitsu = new (require('kitsu.js'))();
const { RemiyaEmbed, shortenerText } = require('../../../util/functions/index');

module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar um anime que queira pesquisar.`);
        kitsu.searchAnime(msg.args.join(' ')).then(r => {
        if (r.length === 0) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar um anime com o nome: \`${msg.args.join(' ')}\`.`);
            msg.channel.send(
                new RemiyaEmbed(msg.author)
                .setAuthor('Kitsu.io', 'https://pbs.twimg.com/profile_images/807964865511862278/pIYOVdsl_400x400.jpg','https://kitsu.io/explore/anime')
                .setTitleURL(r[0].titles.english ? r[0].titles.english : msg.args.join(' ')+' | '+r[0].showType, `https://kitsu.io/anime/${r[0].slug}`)
                .setDescription(shortenerText(r[0].synopsis, 1500))
                .setThumbnail(r[0].posterImage ? r[0].posterImage.original : null)
                .setColor(msg.config.colors.KITSU)
                .addFieldArray('<:informacoes_:599308751681355776> | Informações', [[
                    `${msg.config.e_men._seta}Nome Japonês: ${r[0].titles.romaji}`,
                    `${msg.config.e_men._seta}Classificação indicativa: ${r[0].ageRating}`,
                    `${msg.config.e_men._seta}NSFW: ${r[0].nsfw ? 'sim' : 'não'}`
                ]])
                .addFieldArray('<:estatisticas_:599308751694200846> | Estatísticas', [[
                    `${msg.config.e_men._seta}Classificação média: ${r[0].averageRating}`,
                    `${msg.config.e_men._seta}Ranque: ${r[0].ratingRank}`,
                    `${msg.config.e_men._seta}Ranque de popularidade: ${r[0].popularityRank}`
                ]])
                .addFieldArray('<:server_:587307180064112671> | Status', [[
                    `${msg.config.e_men._seta}Episódios: ${r[0].episodeCount ? r[0].episodeCount : 'N/A'}`,
                    `${msg.config.e_men._seta}Data de inicio: ${moment.utc(r[0].startDate).format('LLLL')}`,
                    `${msg.config.e_men._seta}Data final: ${r[0].endDate ? moment.utc(r[0].endDate).format('LLLL') : 'em lançamento'}`
                ]])
            ).catch(e => {
                console.log(e.stack)
                msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar este anime: \`${msg.args.join(' ')}\`.`)
            })
        }).catch(e => {
            console.log(e.stack);
            msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, ocorreu um erro inesperado. Tente novamente mais tarde.`);
        })
    },
    conf:{ enable: true, cooldown: 10 },
    help: {
       name: 'anime',
       description: 'pesquise por um anime no [kitsu](https://kitsu.io/explore/anime)',
       usage: ['anime <anime>'],
       member: 'usuários',
       category: 'search',
       credit: ['[Kitsu](https://kitsu.io/explore/anime)']
    }
}