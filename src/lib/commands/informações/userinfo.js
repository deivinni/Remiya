const { RemiyaEmbed } = require('../../../util/functions/index');
const moment = require('moment'); moment.locale('pt-BR');

module.exports = {
  run: async(msg) => {
    if (msg.args[0] == '--cargos') {
      let member = msg.mentions.users.filter(a => a.id != msg.bot.id).first() || msg.bot.users.get(msg.args[1]) || msg.author;
      let message = member.id == msg.author.id ? `${msg.config.e_men.errado} \`|\` ${msg.author}, você não possui nunhum cargo neste servidor.` : `${msg.config.e_men.errado} \`|\` ${msg.author}, este usuário não possui cargos neste servidor.`
      if (msg.guild.member(member).roles.size <= 1) {
        if (member.id == msg.author.id) return msg.channel.send(message)
      }
      else {
        msg.channel.send(
          new RemiyaEmbed(msg.author)
          .setAuthor(`Cargos de ${member.tag}`, member.displayAvatarURL)
          .setDescription(msg.guild.member(member).roles.map(a => a).join(', ').replace('@everyone, ', '') || 'sem cargos')
        )
      }
    } else {
      let usuario = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]) || msg.author;
      let user_status;
      if(usuario.presence.status == 'idle') user_status = 'ausente';
      if(usuario.presence.status == 'online') user_status = 'disponível';
      if(usuario.presence.status == 'dnd') user_status = 'não pertubar';
      if(usuario.presence.status == 'offline') user_status = 'invisível';
      if(usuario.presence.status == 'steam') user_status = 'transmitindo';
      msg.channel.send(
        new RemiyaEmbed(msg.author)
        .setAuthor(`Informações de ${usuario.tag}`, msg.bot.user.displayAvatarURL)
        .setThumbnail(usuario.displayAvatarURL)
        .addFieldArray(`${msg.config.e_men._info} | Informações principais`, [[
          `${msg.config.e_men._seta}Nome: ${usuario.username} - \`${usuario.id}\``,
          `${msg.config.e_men._seta}Status: ${user_status}`,
          `${msg.config.e_men._seta}Jogando: ${usuario.presence.game ? usuario.presence.game.name : '<:offline_:587101313243021322>'}`,
          `${msg.config.e_men._seta}Criado: ${moment(usuario.createdAt).format('LLLL')}`
        ]])
        .addFieldArray(`${msg.config.e_men._seta} | Informações no servidor`, [[
          `${msg.config.e_men._seta}Apelido: ${usuario.nickname || usuario.username}`,
          `${msg.config.e_men._seta}Entrou: ${moment(msg.guild.member(usuario).joinedAt).format('LLLL')}`,
          `${msg.config.e_men._seta}Administrador: ${msg.guild.member(usuario).hasPermission('ADMINISTRATOR') ? msg.config.e_men.ativado : msg.config.e_men.desativado}`,
          `${msg.config.e_men._seta}Cargos: ${msg.guild.member(usuario).roles.size ? 'sem cargos' : msg.guild.member(usuario).roles.size-1}`
        ]])
      )
    }
  },
  conf:{ aliases: ['ui', 'infouser'], enable: true, cooldown: 10 },
  help: {
      name: 'userinfo',
      description: 'veja as informações de alguém membro do servidor',
      usage: ['userinfo [@usuário | --cargos | --cargos @usuário]', 'a'],
      member: 'usuários',
      category: 'informações'
  }
}