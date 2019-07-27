const { RemiyaEmbed } = require('../../../util/functions/index')
const { get } = require('snekfetch')

module.exports = {
  run: async(msg) => {
    msg.channel.startTyping(true);
    get(`https://nekobot.xyz/api/imagegen?type=baguette&url=${msg.author.displayAvatarURL}`)
    .then(async(r) => {
      msg.delete();
      await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.message))
    })
    msg.channel.stopTyping(true);
  },
  conf:{ enable: true, cooldown: 10 },
  help: {
   name: 'baguette',
   description: 'faça uma imagem de você comendo baguette',
   member: 'usuários',
   category: 'imagens',
   credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}