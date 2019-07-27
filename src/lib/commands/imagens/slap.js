const { get } = require('snekfetch');
const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
  run: async(msg) => {
    const member = msg.mentions.users.filter(a => a.id != msg.bot.id).first() || msg.bot.users.get(msg.args[0]);
    if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve mencionar alguém para dar um tapa.`);
    get('https://nekos.life/api/v2/img/slap').then(async(r) => {
      await msg.channel.send(
        new RemiyaEmbed(msg.author).setImage(r.body.url)
        .setDescription(`<:slap_:589433427774930956> \`|\` ${msg.author}, deu um tapa em ${member}.`)
      )
    })        
  },
  conf:{ aliases: ['bater'], enable: true, cooldown: 10 },
  help: {
    name: 'slap',
    description: 'bata em alguém usuário',
    usage: ['slap @usuário'],
    member: 'usuários',
    category: 'imagens',
    credit: ['[Nekos.life](https://nekos.life/)']
  }
}