module.exports = {
    run: async(msg) => {
        if (!isFlag(msg)) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível desmutar este usuário.`);
        const member = msg.guild.member(msg.mentions.users.filter(a => a.id != msg.bot.id).first() || msg.bot.users.get(msg.args[0]));
        msg.channel.send(`${msg.config.e_men._correto} \`|\` ${msg.author}, o usuário ${member} foi desmutado com sucesso.`)
        .then(() => member.setMute(false))
        .catch(() => msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível desmutar este usuário.`))
    },
    conf:{
        aliases: [],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3
    },
    help: {
        name: 'unmute',
        description: 'desmute alguém do servidor.',
        usage: ['unmute @usuário'],
        member: 'moderadores',
        category: 'moderação'
    }
}

function isFlag(msg) {
    const { Permissions } = require('discord.js');
    if (!msg.guild)
        return false
    if(!msg.guild.me.permissions.has(Permissions.FLAGS.MUTE_MEMBERS))
        if(!msg.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return false
    if(!msg.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS))
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