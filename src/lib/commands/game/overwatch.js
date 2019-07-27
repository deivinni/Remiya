const { RemiyaEmbed } = require('../../../util/functions/index');
const { get } = require('snekfetch');

module.exports = {
  run: async(msg) => {
    if (!msg.args[0]) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, favor coloque a plataforma (\`pc\`, \`xbl\`, \`psn\`) do jogador.`);
    if (!msg.args[1]) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, favor coloque a região do jogador.`);
    if (!msg.args[2]) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, favor coloque a battle.tag do jogador.`);
    get(`http://overwatchy.com/profile/${msg.args[0]}/${msg.args[1]}/${msg.args[2].replace('#','-')}`)
    .then(async(data) => {
      if (data.length === 0) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar as informações do jogador: \`${msg.args[2]}\`.`);
      msg.channel.startTyping(true)
      msg.channel.send(
        new RemiyaEmbed(msg.author).setThumbnail(data.body.portrait)
        .setAuthor('Overwatch Player', msg.bot.user.displayAvatarURL, `https://playoverwatch.com/pt-br/career/${msg.args[0]}/${msg.args[2].replace('#','-')}`)
        .addFieldArray(`${msg.config.e_men._info} | Informações`, [[
          `${msg.config.e_men._seta}Nome: ${data.body.username}`,
          `${msg.config.e_men._seta}Level: ${data.body.level}`,
          `${msg.config.e_men._seta}Tempo de jogo: ${data.body.playtime.quickplay} / ${data.body.playtime.competitive}`,
        ]])
        .addFieldArray(`<:top500:601214764395528213> | Competitiva`, [[
          `${msg.config.e_men._seta}Ranque: ${data.body.competitive.rank || 'não completou a MD10'}`,
          `${msg.config.e_men._seta}Tempo de jogo: ${data.body.playtime.competitive}`,
          `${msg.config.e_men._seta}Vitórias: ${data.body.games.competitive.won || '0'}/${data.body.games.competitive.played || '0'}`,
          `${msg.config.e_men._seta}Derrotas: ${data.body.games.competitive.lost || '0'}/${data.body.games.competitive.played || '0'}`,
          `${msg.config.e_men._seta}Empates: ${data.body.games.competitive.draw || '0'}/${data.body.games.competitive.played || '0'}`
        ]])
        .addFieldArray(`<:OWLgg:601214782820843520> | Jogo rapido`, [[
          `${msg.config.e_men._seta}Tempo de jogo: ${data.body.playtime.quickplay}`,
          `${msg.config.e_men._seta}Vitórias: ${data.body.games.quickplay.won}`
        ]])
      )
      msg.channel.stopTyping(true)
    })
  },
  conf:{ aliases: ['ow'], enable: true, cooldown: 10 },
  help: {
     name: 'overwatch',
     description: 'pesquise por um jogador de [overwatch](https://playoverwatch.com/pt-br/)',
     usage: ['overwatch <plataforma> <região> <player>'],
     member: 'usuários',
     category: 'game',
     credit: ['[Blizzard](https://www.blizzard.com/pt-br/)']
  }
}