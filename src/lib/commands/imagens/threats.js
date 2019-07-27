const { RemiyaEmbed } = require('../../../util/functions/index')
const { get } = require('snekfetch')

module.exports = {
  run: async(msg) => {
    const image = msg.args.join(' ') || msg.author.displayAvatarURL;
    msg.channel.startTyping(true);
    get(`https://nekobot.xyz/api/imagegen?type=threats&url=${image}`)
    .then(async(r) => {
      msg.delete();
      await msg.channel.send(new RemiyaEmbed(msg.author).setImage(r.body.message))
    })
    msg.channel.stopTyping(true);
  },
  conf:{ enable: true, cooldown: 10 },
  help: {
   name: 'threats',
   description: 'mostre as 3 maiores ameaças do planeta',
   usage: ['threats [imagem]'],
   member: 'usuários',
   category: 'imagens',
   credit: ['[NekoBot API](https://nekobot.xyz/)']
  }
}