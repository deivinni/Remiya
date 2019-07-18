module.exports = {
    run: async(msg) => {
        const paulo = msg.bot.users.get('414175662044086272')
        if (!['414175662044086272'].some(id => msg.author.id == id)) return;
        else {
            msg.delete();
            msg.channel.send('BOM DIA!')
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
        cowldoon: 3
    },
    help: {
        name: 'paulo-bomdia',
        description: 'manda um bom dia do paulo',
        usage: ['paul-bomdia'],
        member: 'Paulo',
        category: 'diversão'
    }
}