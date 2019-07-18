module.exports = {
    run: async(msg) => {
        msg.channel.send(`${msg.config.e_men.ping} \`|\` ${msg.author}, minha latência é \`${Math.ceil(msg.bot.ping)}\` ms!`);
    },
    conf: {
        aliases: ['latency'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3
    },
    help: {
        name: 'ping',
        description: 'veja a minha latência',
        member: 'usuários',
        category: 'informações',
        usage: ['ping']
    }
}