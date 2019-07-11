module.exports = {
    run: async(msg) => {
        const henrique = msg.bot.users.get('267064233102016514')
        if (!['267064233102016514'].some(id => msg.author.id == id)) return;
        else {
            msg.delete()
            msg.channel.createWebhook(henrique.username, henrique.displayAvatarURL)
            .then(w => w.send('<@308287298632417291>, vai toma no cu!'))
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
        name: 'caio',
        description: 'manda o caio toma no cu',
        usage: ['caio'],
        member: 'HPBGalactico',
        category: 'diversão'
    }
}