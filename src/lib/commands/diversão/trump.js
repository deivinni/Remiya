const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
  run: async(msg) => {
    if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar alguma mensagem para o Donald Trump tweetar.`);
    msg.channel.startTyping(true);
    require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${msg.args.join(' ')}`)
    .then(async (r) => {
      msg.delete();
      await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.message))
    })
    msg.channel.stopTyping(true);
  },
  conf:{ aliases: ['trumptweet'], enable: true, cooldown: 10 },
  help: {
    name: 'trump',
    description: 'faça o Donald Trump twittar algo.',
    usage: ['trump <mensagem>'],
    member: 'usuários',
    category: 'diversão',
    credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}