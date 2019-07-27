const moment = require('moment'); moment.locale('pt-BR');
const { RemiyaEmbed, shortenerText } = require('../../../util/functions/index');
const youtube = new (require('simple-youtube-api'))(process.env.YOUTUBE_KEY);

module.exports = {
  run: async(msg) => {
    if (!msg.args[0]) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, coloque algo que deseje pesquisar.`);
    youtube.searchVideos(msg.args.join(' '), 1).then(r => {//r = resultado
      msg.channel.send(
        new RemiyaEmbed(msg.author)
        .setAuthor(`Resultado de: ${msg.args.join(' ')}`.split(',').join(''), 'https://img.icons8.com/color/384/youtube-play.png')
        .setImage(r[0].thumbnails.high.url)
        .setThumbnail(r[0].channel.thumbnails)
        .addFieldArray(`${msg.config.e_men._info} | Informações`, [[
          `${msg.config.e_men._seta}Título: ${r[0].title}`,
          `${msg.config.e_men._seta}Publicado em: ${moment(r[0].publishedAt).format('LLLL')}`,
          `${msg.config.e_men._seta}Tipo: ${r[0].type}`
        ]])
        .addFieldArray(`${msg.config.e_men.add} | Informações adicionais`, [[
          `${msg.config.e_men._seta}Canal: ${r[0].channel.title} - [Link do canal](${r[0].channel.url})`,
          `${msg.config.e_men._seta}Link: [clique aqui](${r[0].shortURL})`,
          `${msg.config.e_men._seta}Descrição:\n${shortenerText(r[0].description)}`
        ]])
      )
    })
  },
  conf:{ aliases: ['yt'], enable: true, cooldown: 10 },
  help: {
    name: 'youtube',
    description: 'pesquise um vídeo no youtube',
    usage: ['youtube <vídeo>'],
    member: 'usuários',
    category: 'search',
    credit: ['[YouTube](https://www.youtube.com)']
  }
}