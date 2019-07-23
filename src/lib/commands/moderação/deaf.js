module.exports = {
    run: async(msg) => {
        if (!isFlag(msg)) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível ensurdecer este usuário.`);
        const member = msg.guild.member(msg.mentions.users.filter(a => a.id != msg.bot.id).first() || msg.bot.users.get(msg.args[0]));
        msg.channel.send(`${msg.config.e_men._correto} \`|\` ${msg.author}, o audio do usuário ${member} foi desativado.`)
        .then(() => member.setDeaf(true))
        .catch(() => msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível ensurdecer este usuário.`))
    },
    conf:{ aliases: ['ensurdecer'], enable: true, cooldown: 30 },
    help: {
        name: 'deaf',
        description: 'desative e audio de alguma pessoa.',
        usage: ['deaf @usuário'],
        member: 'moderadores',
        category: 'moderação'
    }
}

function isFlag(msg) {
    const { Permissions } = require('discord.js');
    if (!msg.guild) return false
    if(!msg.guild.me.permissions.has(Permissions.FLAGS.DEAFEN_MEMBERS))
        if(!msg.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return false
    if(!msg.member.permissions.has(Permissions.FLAGS.DEAFEN_MEMBERS))
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