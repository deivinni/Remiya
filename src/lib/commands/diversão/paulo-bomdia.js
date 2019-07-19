module.exports = {
    run: async(msg) => {
        msg.delete();
        if (!['414175662044086272'].some(id => msg.author.id == id)) return;
        msg.channel.send('BOM DIA!')
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