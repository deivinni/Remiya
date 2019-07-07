const moment = require('moment');
const { RichEmbed } = require('discord.js');
const youtube = new (require('simple-youtube-api'))(process.env.YOUTUBE_KEY);
const { stripIndents } = require('common-tags');

module.exports = {
    run: async(msg) => {
        if (!msg.args[0]) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, coloque algo que deseje pesquisar.`);
        youtube.searchVideos(msg.args.join(' '), 1).then(r => {//r = resultado
            msg.channel.send(
                new RichEmbed()
                .setAuthor(`Resultado de: ${msg.args.join(' ')}`.split(',').join(''), 'https://img.icons8.com/color/384/youtube-play.png')
                .setImage(r[0].thumbnails.high.url)
                .setThumbnail(r[0].channel.thumbnails)
                .setColor(msg.config.colors.padrão)
                .setFooter(msg.author.tag,msg.author.displayAvatarURL)
                .setTimestamp()
                .addField(`${msg.config.e_men._info} | Informações`, stripIndents`
                ${msg.config.e_men.seta_} Título: ${r[0].title}
                ${msg.config.e_men.seta_} Publicado em: ${moment(r[0].publishedAt).format('LLLL')}
                ${msg.config.e_men.seta_} Tipo: ${r[0].type}
                `)
                .addField(`${msg.config.e_men.add} | Informações adicionais`, stripIndents`
                ${msg.config.e_men.seta_} Canal: ${r[0].channel.title} - [Link do canal](${r[0].channel.url})
                ${msg.config.e_men.seta_} Link: [clique aqui](${r[0].shortURL})
                ${msg.config.e_men.seta_} Descrição:\n${r[0].description}
                `)
            )
        })
    },
    conf:{
        aliases: ['yt'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 10,
        helper: {
            name: 'youtube',
            description: 'pesquise um vídeo no youtube',
            usage: ['youtube <nome de vídeo>'],
            member: 'usuários',
            category: 'search'
        }
    }
}