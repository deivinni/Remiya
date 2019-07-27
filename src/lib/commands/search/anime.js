const moment = require('moment'); moment.locale('pt-BR');
const jikan = require('jikanjs');
const { RemiyaEmbed, shortenerText } = require('../../../util/functions/index');
const translate = require('@vitalets/google-translate-api');

module.exports = {
  run: async(msg) => {
    if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar um anime que queira pesquisar.`);
    try {
      jikan.search('anime', msg.args.join(' ')).then(r => {
        jikan.loadAnime(r.results[0].mal_id).then(data => {
          translate(shortenerText(data.synopsis.replace(' [Written by MAL Rewrite]',''), 500), {to: 'pt'}).then(res => {
            msg.channel.startTyping(true)
            const embed = new RemiyaEmbed(msg.author)
            .setAuthor('My Anime List','https://i.imgur.com/vEy5Zaq.jpg','https://myanimelist.net')
            .setTitleURL(`${data.title ? data.title : msg.args.join(' ')}${data.type ? ' | '+data.type : ''}`, data.url || null)
            .setDescription('Reaja em <:insta_:587008691044352034> para ver a imagem do anime.')
            .addFieldArray(`${msg.config.e_men._info} | Informações`, [[
              `${msg.config.e_men._seta}Nomê Japonês: ${data.title_japanese || '???'}`,
              `${msg.config.e_men._seta}My Anime List ID: ${data.mal_id || '???'}`,
              `${msg.config.e_men._seta}Classificação indicativa: ${data.rating || '???'}`,
              `${msg.config.e_men._seta}Original: ${data.source || '???'}`,
              `${msg.config.e_men._seta}Estudio: ${data.studios.map(a => a.name).join(', ') || '???'}`,
              `${msg.config.e_men._seta}Gêneros: ${data.genres.map(a => a.name).slice(0, 3).join(', ')+', etc.' || '???'}`,
              `${msg.config.e_men._seta}Trailer: ${'[clique aqui]('+data.trailer_url+')' || '???'}`
            ]]).addFieldArray('<:estatisticas_:599308751694200846> | Estatísticas', [[
              `${msg.config.e_men._seta}Ranque: #${data.rank || '???'}`,
              `${msg.config.e_men._seta}Pontuação: ${data.score || '???'}${data.scored_by ? `/${data.scored_by} usuários` : ''}`,
              `${msg.config.e_men._seta}Popularidade: #${data.popularity || '???'}`,
              `${msg.config.e_men._seta}Membros: ${data.members || '???'}`,
              `${msg.config.e_men._seta}Favoritos: ${data.favorites || '???'}`
            ]]).addFieldArray('<:server_:587307180064112671> | Status', [[
              `${msg.config.e_men._seta}Episódios: ${data.episodes || '???'}`,
              `${msg.config.e_men._seta}Conteúdo: ${data.status == 'Finished Airing' ? 'Completo' : 'Em lançamento'}`,
              `${msg.config.e_men._seta}Duração dos episódios: ${data.duration.replace('per ep', 'por episódio')}`,
              `${msg.config.e_men._seta}Data de início: ${moment.utc(data.aired.from).format('LLLL') || '???'}`,
              `${msg.config.e_men._seta}Data final: ${moment.utc(data.aired.to).format('LLLL') || '???'}`
            ]])
            .addField('<a:typing:603362120528166915> | Sinopse', res.text || '???')
            msg.channel.stopTyping(true)
            msg.channel.send(embed).then(m => m.react('587008691044352034').then(() => {
              const collector = m.createReactionCollector((r,u) => r.emoji.id === '587008691044352034' && u.id === msg.author.id, {time: 60000});
              collector.on('collect', (r) => {
                switch(r.emoji.id) {
                  case '587008691044352034':
                    m.clearReactions();
                    data.image_url 
                    ? m.edit(
                      new RemiyaEmbed(msg.author).setImage(data.image_url ? data.image_url : null)
                      .setTitleURL(`${data.title ? data.title : msg.args.join(' ')}${data.type ? ' | '+data.type : ''}`, data.url || null)
                    )
                    : m.edit(
                      new RemiyaEmbed().setColor(msg.config.colors.VERMELHO).setDescription(`A imagem do anime ${data.title ? data.title : msg.args.join(' ')} está indisponível.`)
                    )
                  break;
                }
              })
              setTimeout(() => { m.clearReactions(); m.edit(embed.setDescription('')) }, 60000);
            }))
          })
        })
      })
    } catch (e) {
      console.log(e.stack);
      msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, ocorreu um erro inesperado. Tente novamente mais tarde.`);
    }
  },
  conf:{ enable: true, cooldown: 30 },
  help: {
   name: 'anime',
   description: 'pesquise por um anime no My Anime List',
   usage: ['anime <anime>'],
   member: 'usuários',
   category: 'search',
   credit: ['[Jikan](https://jikan.moe)','[My Anime List](https://myanimelist.net)']
  }
}