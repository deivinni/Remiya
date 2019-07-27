module.exports = {
  run: async(msg) => {
    const limit = Number(msg.args.join(' '));
    if (!isFlag(msg) || !msg.args.join(' ')) 
      return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível apagar as mensagens.`);
    await msg.channel.bulkDelete(limit, true);
    msg.channel.send(`${msg.config.e_men._correto} \`|\` ${msg.author}, ${`\`${limit}\` ` + limit === 1 ? 'mensagem foi apagada' : 'mensagens foram apagadas'} do ${msg.channel} com sucesso.`);
  },
  conf:{ aliases: ['limpar','purge'], enable: true, cooldown: 5 },
  help: {
    name: 'clear',
    description: 'limpe específicas mensagens.',
    usage: ['clear <número>'],
    member: 'moderadores',
    category: 'moderação'
  }
}

function isFlag(msg) {
  const { Permissions } = require('discord.js');
  if (!msg.guild) return false
  if(!msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
    if(!msg.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return false
  if(!msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
    if(!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return false
  return true
}