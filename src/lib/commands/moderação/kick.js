module.exports = {
  run: async(msg) => {
    if (!isFlag(msg)) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível expulsar este usuário.`);
    const member = msg.guild.member(msg.mentions.filter(a => a.id != msg.bot.id).first() || msg.bot.users.get(msg.args[0]));
    msg.channel.send(`${msg.config.e_men._correto} \`|\` ${msg.author}, o usuário ${member} foi expulso com sucesso.`)
    .then(member.kick({reason: msg.args.slice(1).join(' ') || 'Motivo não especificado.'}))
    .catch(msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível expulsar este usuário.`))
  },
  conf:{ enable: true, cooldown: 30 },
  help: {
    name: 'kick',
    description: 'expulse alguém do servidor.',
    usage: ['kick @usuário'],
    member: 'moderadores',
    category: 'moderação'
  }
}

function isFlag(msg) {
  const { Permissions } = require('discord.js');
  if (!msg.guild) return false
  if(!msg.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
    if(!msg.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return false
  if(!msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
    if(!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return false
  if(msg.guild.members.get(msg.mentions.users.first()))
    if(!msg.guild.members.get(msg.mentions.users.first()).kickable)
      return false
  if(msg.guild.members.get(msg.args[0]))
    if(!msg.guild.members.get(msg.args[0]).kickable)
      return false
  if(msg.guild.roles.get(msg.mentions.roles.first()))
    if(!msg.guild.roles.get(msg.mentions.roles.first()).kickable)
      return false
  if(msg.guild.roles.get(msg.args[0]))
    if(!msg.guild.roles.get(msg.args[0]).kickable)
      return false
  return true
}