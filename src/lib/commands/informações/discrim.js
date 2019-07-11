module.exports = {
    run: async(msg) => {
        const discrim = (msg.args[0] || msg.author.discriminator).replace('#','')
        const users = msg.bot.users.filter(user => user.discriminator === discrim).map(user => user.tag);
        if (users.length < 1) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não encontrei nenhum usuário com este discriminador: \`#${discrim}\`.`);
        msg.channel.send(
            new (require('discord.js').RichEmbed)()
            .setTitle(`${users.length} ${users.length > 1 ? 'usuários' : 'usuário'} com este discriminador: #${discrim}`)
            .setColor(msg.config.colors.padrão)
            .setDescription(users.join(' \`|\` '))
        )
    },
    conf:{
        aliases: ['discriminator','discriminador'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 5
    },
    help: {
       name: 'discrim',
       description: 'veja os usuários com um determinado discriminador',
       usage: ['discrim <discriminador>'],
       member: 'usuários',
       category: 'informações'
    }
}