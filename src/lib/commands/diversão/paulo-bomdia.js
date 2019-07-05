module.exports = {
    run: async(msg) => {
        const paulo = msg.bot.users.get('414175662044086272')
        if (!['414175662044086272'].some(id => msg.author.id == id)) return;
        else {
            msg.delete()
            msg.channel.createWebhook(paulo.username, paulo.displayAvatarURL)
            .then(w => w.send('Bom dia!'))
        }
    },
    conf:{
        aliases: [],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: false,
        cowldoon: 3,
        helper: {
            name: 'paulo-bomdia',
            description: 'manda um bom dia do paulo',
            usage: ['caio'],
            member: 'Paulo',
            category: 'diversão'
        }
    }
}