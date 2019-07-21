const { RemiyaEmbed } = require('../../../util/functions/index')
const os = require('os');
const moment = require('moment'); moment.locale('pt-BR');

module.exports = {
    run: async(msg) => {
        msg.channel.send(
            new RemiyaEmbed(msg.author)
            .setThumbnail(msg.bot.user.displayAvatarURL)
            .addFieldArray(`${msg.config.e_men._info} | Informações minhas`, [[
                `${msg.config.e_men._seta}Criador: ${msg.bot.users.get(msg.config.owner_id[0]).tag}`,
                `${msg.config.e_men._seta}Criada em: ${moment(msg.bot.user.createdAt).format('LLL')}`,
                `${msg.config.e_men._seta}Versão: 1.4.8`,
                `${msg.config.e_men._seta}Latência: ${Math.ceil(msg.bot.ping)} ms`,
                `${msg.config.e_men._seta}Uptime: ${moment.duration(msg.bot.uptime).format('`D` [d], `H` [h], `m` [min], `s` [segs]')}`,
                `${msg.config.e_men._seta}Discord.js: ${require('discord.js').version}`,
                `${msg.config.e_men._seta}Total de servidores: ${msg.bot.guilds.size}`,
                `${msg.config.e_men._seta}Total de usuários: ${msg.bot.users.size}`,
                `${msg.config.e_men._seta}Total de comandos: ${msg.bot.commands.size-msg.bot.commands.filter(c=>c.help.category==='owner').size}`
            ]])
            .addFieldArray(`<:process_:601822798456815617> | Processamento`, [[
                `${msg.config.e_men._seta}Hostname: ${os.hostname()}`,
                `${msg.config.e_men._seta}CPU: ${(process.cpuUsage().user/1024/1024/100).toFixed(2)}%`,
                `${msg.config.e_men._seta}RAM: ${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)}MB\/${(os.totalmem()/1024/1024/1024).toFixed(2)}GB`,
                `${msg.config.e_men._seta}Processador: ${os.cpus().length}x ${os.cpus()[0].model}`
            ]])
            .addFieldArray(`🔗 | Links úteis`, [[
                `${msg.config.e_men._seta}Github: [clique aqui](https://github.com/DEIVINNI/Remiya)`,
                `${msg.config.e_men._seta}Invite: [indisponível](https://www.discordapp.com/)`,
                `${msg.config.e_men._seta}Servidor: [em breve](https://www.discordapp.com/)`,
                `${msg.config.e_men._seta}Site: [em breve](https://www.google.com/)`
            ]])
        )
    },
    conf:{
        aliases: [],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: true,
        enable: true,
        hide_help: true,
        cooldown: 10
    },
    help: {
       name: 'botinfo',
       description: 'veja algumas informações sobre mim',
       usage: ['botinfo'],
       member: 'usuários',
       category: 'informações'
    }
}