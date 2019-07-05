const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment'); moment.locale('pt-BR');

module.exports = {
    run: async(msg) => {
        if (msg.args[0] == '--cargos') {
            msg.channel.send(
                new RichEmbed()
                .setColor(msg.config.colors.padrão)
                .setAuthor('Cargos do Servidor', msg.guild.iconURL)
                .setFooter(msg.author.tag, msg.author.displayAvatarURL)
                .setTimestamp()
                .setDescription(msg.guild.roles.map(r => r).join(', ').replace('@everyone, ', ''))
            )
        } else {
            let member_status = `${msg.config.e_men.online} ${msg.guild.members.filter(m => m.presence.status == 'online').size} \`|\` ${msg.config.e_men.offline} ${msg.guild.members.filter(m => m.presence.status == 'offline').size} \`|\` ${msg.config.e_men.dnd} ${msg.guild.members.filter(m => m.presence.status == 'dnd').size} \`|\` ${msg.config.e_men.idle} ${msg.guild.members.filter(m => m.presence.status == 'idle').size} \`|\``
              , bots = msg.guild.members.filter(m => m.user.bot).size
              , canais_texto = msg.guild.channels.filter(c => c.type == 'text').size
              , canais_voz = msg.guild.channels.filter(c => c.type == 'voice').size
              , cargos = msg.guild.roles.size;
            msg.channel.send(
                new RichEmbed()
                .setAuthor('Informações do Servidor', msg.guild.iconURL)
                .setTimestamp()
                .setColor(msg.config.colors.padrão)
                .setThumbnail(msg.guild.iconURL)
                .setFooter(msg.author.tag, msg.author.displayAvatarURL)
                .addField(`${msg.config.e_men._info} | Informações`, stripIndents`
                ${msg.config.e_men._seta} Nome: ${msg.guild.name} - \`${msg.guild.id}\`
                ${msg.config.e_men._seta} Dono: ${msg.guild.owner} - \`${msg.guild.ownerID}\`
                ${msg.config.e_men._seta} Membros: ${msg.guild.memberCount}
                ${msg.config.e_men._seta} Canais: ${canais_texto+canais_voz}
                ${msg.config.e_men._seta} Cargos: ${cargos}
                ${msg.config.e_men._seta} Criado: ${moment(msg.guild.createdAt).format('LLLL')}
                `)
                .addField(`${msg.config.e_men.add} | Informações adicionais`, stripIndents`
                ${msg.config.e_men._seta} Membros: ${member_status}
                ${msg.config.e_men._seta} Bots: ${bots}
                ${msg.config.e_men._seta} Canais de texto: ${canais_texto}
                ${msg.config.e_men._seta} Canais de voz: ${canais_voz}
                ${msg.config.e_men._seta} Cargos: \`${msg.config.prefix}serverinfo --cargos\` para ver todos os cargos
                `)
            )
        }
    },
    conf: {
        aliases: ['infoserver', 'si'],
        nsfw: false,
        ownerOnly: false,
        guildOnly: true,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3,
        helper:{
            name: 'serverinfo',
            description: 'veja as informações do servidor',
            usage: ['serverinfo','serverinfo --cargos'],
            member: 'usuários',
            category: 'informações'
        }
    }
}