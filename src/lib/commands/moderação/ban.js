module.exports = {
    run: async(msg) => {
        if (!isFlag(msg)) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível banir este usuário.`);
        const member = msg.guild.member(msg.mentions.users.filter(a => a.id != msg.bot.id).first() || msg.bot.users.get(msg.args[0]));
        msg.channel.send(`${msg.config.e_men._correto} \`|\` ${msg.author}, o usuários ${member} foi banido com sucesso!`)
        .then(() => member.ban({reason: msg.args.slice(1).join(' ') || 'Motivo não especificado.'}))
        .catch(() => msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível banir este usuário.`));
    },
    conf:{ aliases: ['banir'], enable: true, cooldown: 30 },
    help: {
        name: 'ban',
        description: 'faça algum banimento no servidor.',
        usage: ['ban @usuário'],
        member: 'moderadores',
        category: 'moderação'
    }
}

function isFlag(msg) {
    const { Permissions } = require('discord.js');
    if (!msg.guild)
        return false
    if(!msg.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
        if(!msg.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return false
    if(!msg.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
        if(!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return false
    return true
}