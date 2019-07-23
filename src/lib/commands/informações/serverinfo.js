const { RemiyaEmbed } = require('../../../util/functions/index');
const moment = require('moment'); moment.locale('pt-BR');

module.exports = {
    run: async(msg) => {
        if (msg.args[0] == '--cargos') {
            msg.channel.send(
                new RemiyaEmbed(msg.author)
                .setAuthor('Cargos do Servidor', msg.guild.iconURL)
                .setDescription(msg.guild.roles.map(r => r).join(', ').replace('@everyone, ', ''))
            )
        } else {
            msg.channel.send(
                new RemiyaEmbed(msg.author)
                .setAuthor('Informações do Servidor', msg.guild.iconURL)
                .setThumbnail(msg.guild.iconURL)
                .addFieldArray(`${msg.config.e_men._info} | Informações`, [[
                    `${msg.config.e_men._seta}Nome: ${msg.guild.name} - \`${msg.guild.id}\``,
                    `${msg.config.e_men._seta}Dono: ${msg.guild.owner} - \`${msg.guild.ownerID}\``,
                    `${msg.config.e_men._seta}Membros: ${msg.guild.memberCount}`,
                    `${msg.config.e_men._seta}Canais: ${msg.guild.channels.size}`,
                    `${msg.config.e_men._seta}Cargos: ${msg.guild.roles.size}`,
                    `${msg.config.e_men._seta}Criado: ${moment(msg.guild.createdAt).format('LLLL')}`
                ]])
                .addFieldArray(`${msg.config.e_men.add} | Informações adicionais`, [[
                    `${msg.config.e_men._seta}Membros: ${`${msg.config.e_men.online} ${msg.guild.members.filter(m => m.presence.status == 'online').size} \`|\` ${msg.config.e_men.offline} ${msg.guild.members.filter(m => m.presence.status == 'offline').size} \`|\` ${msg.config.e_men.dnd} ${msg.guild.members.filter(m => m.presence.status == 'dnd').size} \`|\` ${msg.config.e_men.idle} ${msg.guild.members.filter(m => m.presence.status == 'idle').size}`}`,
                    `${msg.config.e_men._seta}Bots: ${msg.guild.members.filter(m => m.user.bot).size}`,
                    `${msg.config.e_men._seta}Canais de texto: ${msg.guild.channels.filter(c => c.type == 'text').size}`,
                    `${msg.config.e_men._seta}Canais de voz: ${msg.guild.channels.filter(c => c.type == 'voice').size}`,
                    `${msg.config.e_men._seta}Cargos: \`${msg.config.prefix}serverinfo --cargos\` para ver todos os cargos.`
                ]])
            )
        }
    },
    conf:{ aliases: ['infoserver', 'si'], enable: true, cooldown: 10 },
    help:{
        name: 'serverinfo',
        description: 'veja as informações do servidor',
        usage: ['serverinfo [--cargos]', 'a'],
        member: 'usuários',
        category: 'informações'
    }
}