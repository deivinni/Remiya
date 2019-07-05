module.exports = {
    run: async(msg) => {
        if (msg.args[0] == '--guild') {
            if (msg.member.permissions.has('MANAGE_GUILD')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você não pode registrar este servidor em minha database.`)
            else {
                msg.database.ref(`Guilds/${msg.guild.id}`).set({
                    'lang': regions[guild.region],
                    'prefix': config.prefix,
                    'leveis': true,
                    'channel_level': {
                        'enable': false,
                        'id': ''
                    },
                    'channel_command': {
                        'enable': false,
                        'id': ''
                    },
                    'channel_': {
                        'enable': false,
                        'id': ''
                    }
                })
                return msg.channel.send(`${msg.config.e_men.correto} \`|\` ${msg.author}, o servidor \`${msg.guild.name}\` foi adicionado com sucesso em minha database.`);
            }
        } else if (!msg.args.lenght || msg.args[0] == '--user') {
            if ([msg.config.owner[0]].some(id => msg.author.id == id)) {
                msg.database.ref(`Users/${bot.users.get(msg.args[1]).id}`).set({
                    'sobre': '',
                    'xp': 0,
                    'level': 1,
                    'coins': 0,
                    'ban': false,
                    'rep': 0,
                    'premiun': false
                })
                return msg.channel.send(`${msg.config.e_men.correto} \`|\` ${msg.author}, o usuários \`${bot.users.get(msg.args[1]).tag}\` foi adicionado com sucesso em minha database.`);
            } else {
                msg.database.ref(`Users/${msg.author.id}`).set({
                    'sobre': '',
                    'xp': 0,
                    'level': 1,
                    'coins': 0,
                    'ban': false,
                    'rep': 0,
                    'premiun': false
                })
                return msg.channel.send(`${msg.config.e_men.correto} \`|\` ${msg.author}, você foi adicionado com sucesso em minha database.`);
            }
        }
    },
    conf:{
        aliases: ['registrar'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: true,
        enable: true,
        hide_help: true,
        cooldown: 3,
        helper: {
            name: 'register',
            description: 'registre o servidor ou o usuário em minha database.',
            usage: ['register','register --user','register --guild'],
            member: 'usuários',
            category: 'utilidades'
        }
    }
}