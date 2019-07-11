const { stripIndents } = require('common-tags');
const moment = require('moment');
const kitsu = new (require('kitsu.js'))();

module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar um manga que queira pesquisar.`);
        try {
            kitsu.searchManga(msg.args.join(' ')).then(result => {
                if (result.length === 0) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar um manga com o nome: \`${msg.args.join(' ')}\`.`);
                const manga = result[0];
                msg.channel.send(
                    new (require('discord.js').RichEmbed)()
                    .setAuthor('Kitsu.io', 'https://pbs.twimg.com/profile_images/807964865511862278/pIYOVdsl_400x400.jpg','https://kitsu.io/explore/manga')
                    .setTitle(manga.titles.english?manga.titles.english:search+' | '+manga.showType).setURL(`https://kitsu.io/manga/${manga.slug}`)
                    .setDescription(shorten(manga.synopsis))
                    .setFooter(msg.author.tag,msg.author.displayAvatarURL).setTimestamp()
                    .setThumbnail(manga.posterImage ? manga.posterImage.original : null)
                    .setColor(0xff7f42)
                    .addField('<:info_:586617373835132930>Informações', stripIndents`
                    <:seta_:586617374136991768>Nome Japonês: ${manga.titles.romaji}
                    <:seta_:586617374136991768>Classificação indicativa: ${manga.ageRating}
                    <:seta_:586617374136991768>Capitulos: ${manga.chapterCount ? manga.chapterCount : '???'}`)
                    .addField('<:stats_:598147679654248448>Estatísticas', stripIndents`
                    <:seta_:586617374136991768>Classificação média: ${manga.averageRating}
                    <:seta_:586617374136991768>Ranque: ${manga.ratingRank}
                    <:seta_:586617374136991768>Ranque de popularidade: ${manga.popularityRank}`)
                    .addField('<:server_:587307180064112671>Status', stripIndents`
                    <:seta_:586617374136991768>Volumes: ${manga.volumeCount ? manga.volumeCount : '???'}
                    <:seta_:586617374136991768>Data de inicio: ${moment.utc(manga.startDate).format('LLL')}
                    <:seta_:586617374136991768>Data final: ${manga.endDate ? moment.utc(manga.endDate).format('LLLL') : "em lançamento"}`)
                ).catch(e => {
                    console.log(e.stack)
                    msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar este manga: \`${msg.args.join(' ')}\`.`)
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
        manu: true,
        enable: true,
        hide_help: true,
        cooldown: 10
    },
    help: {
       name: 'manga',
       description: 'pesquise por algum manga no [kitsu](https://kitsu.io/explore/manga)',
       usage: ['manga <nome do manga>'],
       member: 'usuários',
       category: 'search'
    }
}

function shorten(text, maxLen = 1500) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}