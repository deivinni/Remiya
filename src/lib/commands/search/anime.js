const { stripIndents } = require('common-tags');
const moment = require('moment');
const kitsu = new (require('kitsu.js'))();

module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar um anime que queira pesquisar.`);
        try {
            kitsu.searchAnime(msg.args.join(' ')).then(result => {
                if (result.length === 0) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar um anime com o nome: \`${msg.args.join(' ')}\`.`);
                const anime = result[0];
                msg.channel.send(
                    new (require('discord.js').RichEmbed)()
                    .setAuthor('Kitsu.io', 'https://pbs.twimg.com/profile_images/807964865511862278/pIYOVdsl_400x400.jpg','https://kitsu.io/explore/anime')
                    .setTitle(anime.titles.english?anime.titles.english:search+' | '+anime.showType).setURL(`https://kitsu.io/anime/${anime.slug}`)
                    .setDescription(shorten(anime.synopsis))
                    .setFooter(msg.author.tag,msg.author.displayAvatarURL).setTimestamp()
                    .setThumbnail(anime.posterImage ? anime.posterImage.original : null)
                    .setColor(0xff7f42)
                    .addField('<:info_:586617373835132930>Informações', stripIndents`
                    <:seta_:586617374136991768>Nome Japonês: ${anime.titles.romaji}
                    <:seta_:586617374136991768>Classificação indicativa: ${anime.ageRating}
                    <:seta_:586617374136991768>NSFW: ${anime.nsfw ? 'sim' : 'não'}`)
                    .addField('<:stats_:598147679654248448>Estatísticas', stripIndents`
                    <:seta_:586617374136991768>Classificação média: ${anime.averageRating}
                    <:seta_:586617374136991768>Ranque: ${anime.ratingRank}
                    <:seta_:586617374136991768>Ranque de popularidade: ${anime.popularityRank}`)
                    .addField('<:server_:587307180064112671>Status', stripIndents`
                    <:seta_:586617374136991768>Episódios: ${anime.episodeCount ? anime.episodeCount : 'N/A'}
                    <:seta_:586617374136991768>Data de inicio: ${moment.utc(anime.startDate).format('LLL')}
                    <:seta_:586617374136991768>Data final: ${anime.endDate ? moment.utc(anime.endDate).format('LLLL') : "em lançamento"}`)
                ).catch(e => {
                    console.log(e.stack)
                    msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar este anime: \`${msg.args.join(' ')}\`.`)
                })
            })
        } catch (e) {
            console.log(e.stack);
            msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, ocorreu um erro inesperado. Tente novamente mais tarde.`);
        }
    },
    conf:{
        aliases: [],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 10
    },
    help: {
       name: 'anime',
       description: 'pesquise por um anime no [kitsu](https://kitsu.io/explore/anime)',
       usage: ['anime <nome do anime>'],
       member: 'usuários',
       category: 'search'
    }
}

function shorten(text, maxLen = 1500) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}