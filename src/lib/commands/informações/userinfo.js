const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
moment.locale('pt-BR');

module.exports = {
    run: async(msg) => {
        if (msg.args[0] == '--cargos') {
            let member = msg.mentions.users.first() || msg.bot.users.get(msg.args[1]) || msg.author;
            if (msg.guild.member(member).roles.size <= 1) {
                if (member.id == msg.author.id) {
                    msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você não possui nunhum cargo neste servidor.`)
                } else {
                    msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, este usuário não possui cargos neste servidor.`);
                }
            } else {
                msg.channel.send(
                    new RichEmbed()
                    .setAuthor(`Cargos de ${member.tag}`, member.displayAvatarURL)
                    .setDescription(msg.guild.member(member).roles.map(a => a).join(', ').replace('@everyone, ', '') || 'sem cargos')
                    .setColor(msg.config.colors.padrão)
                    .setFooter(msg.author.tag, msg.author.displayAvatarURL)
                    .setTimestamp()
                )
            }
        } else {
            let usuario = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]) || msg.author;
            let adm;
            if(msg.guild.member(usuario).hasPermission('ADMINISTRATOR') === true) adm = msg.config.e_men.ativado;
            if(msg.guild.member(usuario).hasPermission('ADMINISTRATOR') === false) adm = msg.config.e_men.desativado;
            let user_status;
            if(usuario.presence.status == 'idle') user_status = 'ausente';
            if(usuario.presence.status == 'online') user_status = 'disponível';
            if(usuario.presence.status == 'dnd') user_status = 'não pertubar';
            if(usuario.presence.status == 'offline') user_status = 'invisível';
            if(usuario.presence.status == 'steam') user_status = 'transmitindo';
            let cargos; 
            if (msg.guild.member(usuario).roles.size <= 1) cargos = 'sem cargos';
            if (msg.guild.member(usuario).roles.size >= 2) cargos = msg.guild.member(usuario).roles.size-1;
            msg.channel.send(
                new RichEmbed()
                .setAuthor(`Informações de ${usuario.tag}`, msg.bot.user.displayAvatarURL)
                .setThumbnail(usuario.displayAvatarURL)
                .addField(`${msg.config.e_men._info} | Informações principais`, stripIndents`
                ${msg.config.e_men._seta} Nome: ${usuario.username} - \`${usuario.id}\`
                ${msg.config.e_men._seta} Status: ${user_status}
                ${msg.config.e_men._seta} Jogando: ${usuario.presence.game ? usuario.presence.game.name : 'jogando nada no momento'}
                ${msg.config.e_men._seta} Criado: ${moment(usuario.createdAt).format('LLLL')}
                `)
                .addField(`${msg.config.e_men._seta} | Informações no servidor`, stripIndents`
                ${msg.config.e_men._seta} Apelido: ${usuario.nickname || 'sem apelido'}
                ${msg.config.e_men._seta} Entrou: ${moment(msg.guild.member(usuario).joinedAt).format('LLLL')}
                ${msg.config.e_men._seta} Administrador: ${adm}
                ${msg.config.e_men._seta} Cargos: ${cargos}`)
                .setColor(msg.config.colors.padrão)
                .setTimestamp()
                .setFooter(msg.author.tag, msg.author.displayAvatarURL)
            )
        }
    },
    conf:{
        aliases: ['ui', 'infouser'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3,
        helper: {
            name: 'userinfo',
            description: 'veja as informações de alguém membro do servidor',
            usage: ['userinfo','userinfo --cargos','userinfo @usuário','userinfo --cargos @usuário'],
            member: 'usuários',
            category: 'informações'
        }
    }
}