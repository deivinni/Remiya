const { RemiyaEmbed } = require('../../../util/functions/index')
const { get } = require('snekfetch')

module.exports = {
  run: async(msg) => {
    msg.channel.startTyping(true);
    get(`https://nekobot.xyz/api/imagegen?type=captcha&url=${msg.author.displayAvatarURL}&username=${msg.author.username}`)
    .then(async(r) => {
      msg.delete();
      await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.message))
    })
    msg.channel.stopTyping(true);
  },
  conf:{ enable: true, cooldown: 10 },
  help: {
   name: 'captcha',
   description: 'faça um captcha com sua foto.',
   member: 'usuários',
   category: 'imagens',
   credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}