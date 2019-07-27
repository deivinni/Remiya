const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
  run: async(msg) => {
    msg.channel.send(
      new RemiyaEmbed(msg.author)
      .setImage('https://cdn.discordapp.com/attachments/587366096839901204/596447280752754708/t-tito.gif')
    )
  },
  conf:{ enable: true, cooldown: 10 },
  help: {
    name: 'tiltado',
    description: 'tá tiltado?!',
    member: 'usuários',
    category: 'diversão'
  }
}