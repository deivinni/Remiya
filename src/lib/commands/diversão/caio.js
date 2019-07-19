module.exports = {
    run: async(msg) => {
        msg.delete()
        if (!['267064233102016514'].some(id => msg.author.id == id)) return;
        msg.channel.send('<@308287298632417291>, VAI TOMA NO CU!')
    },
    conf:{
        aliases: [],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: false,
        cowldoon: 10
    },
    help: {
        name: 'caio',
        description: 'manda o caio toma no cu',
        usage: ['caio'],
        member: 'HPBGalactico',
        category: 'diversão'
    }
}