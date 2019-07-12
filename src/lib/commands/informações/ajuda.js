const { stripIndents } = require('common-tags');
const { readdirSync } = require('fs');
const { RichEmbed } = require('discord.js');

module.exports = {
    run: async(msg) => {
        const embed = new RichEmbed()
        .setColor(msg.config.colors.padrão)
        .setTimestamp()
        .setThumbnail(msg.bot.user.displayAvatarURL)
        .setFooter(msg.author.tag, msg.author.displayAvatarURL)
        .setAuthor(`Comandos da ${msg.bot.user.username}`,'https://cdn.discordapp.com/emojis/586617374141186097.png?v=1')
        if (!msg.args[0]) {
            msg.channel.send(
                embed.setDescription(stripIndents`
                ${msg.config.e_men.cmd} \`|\` Total de comandos: \`${msg.bot.commands.size-2}\`.
                ${msg.config.e_men.pasta} \`|\` Total de categorias: \`${readdirSync('./src/lib/commands/').length-1}\`.
                ${msg.config.e_men.util} \`|\` Prefixo neste servidor: \`${msg.config.prefix}\`.
                ${msg.config.e_men.add} \`|\` Clique nas reações para ter mais informações de uma categoria.
                `)
                .setTitle('Este são todos os meus comandos.')
                .addField(`<:funny_:588121041029824534> Diversão [${readdirSync('./src/lib/commands/diversão').length}]:`, readdirSync('./src/lib/commands/diversão').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:game_:598130455602003969>Game [${readdirSync('./src/lib/commands/game').length}]`, readdirSync('./src/lib/commands/game').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:insta_:587008691044352034> Imagem/Gif [${readdirSync('./src/lib/commands/imagens').length}]:`, readdirSync('./src/lib/commands/imagens').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:info_:586617373835132930> Informação [${readdirSync('./src/lib/commands/informações').length}]:`, readdirSync('./src/lib/commands/informações').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:moderador_:597150527905857538> Moderação [${readdirSync('./src/lib/commands/moderação').length}]:`, readdirSync('./src/lib/commands/moderação').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:menor18_:597527165503799307> NSFW [${readdirSync('./src/lib/commands/nsfw').length}]:`, msg.channel.nsfw ? readdirSync('./src/lib/commands/nsfw').map(c => `\`${c.split('.')[0]}\``).join(', ') : '*Você precisa estar em um chat `NSFW` para ver estes comandos.*')
                .addField(`<:kanna_search_:586614384269197312> Search [${readdirSync('./src/lib/commands/search').length}]:`, readdirSync('./src/lib/commands/search').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:util_:586617373780344855> Utilidade [${readdirSync('./src/lib/commands/utilidades').length}]:`, readdirSync('./src/lib/commands/utilidades').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .setFooter('Os emojis serão removidos em dentro de um minuto.',msg.author.displayAvatarURL)
            ).then(m => {
                m.react('588121041029824534').then(() => m.react('598130455602003969')).then(() => m.react('587008691044352034')).then(() => m.react('586617373835132930')).then(() => m.react('597150527905857538')).then(() => m.react('597527165503799307')).then(() => m.react('586614384269197312')).then(() => m.react('586617373780344855')).then(() => m.react('587705509344313402')).then(() => {
                    const collector = m.createReactionCollector((r,u) => (r.emoji.id === '588121041029824534','598130455602003969','587008691044352034','586617373835132930','597150527905857538','586614384269197312','586617373780344855','597527165503799307','587705509344313402') && (u.id == msg.author.id), {time:60000});
                    collector.on('collect', (r) => {
                        switch(r.emoji.id) {
                            case '588121041029824534'://diversão
                                r.remove(msg.author.id)
                                m.edit(
                                    new RichEmbed()
                                    .setTitle('Categoria: Diversão')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'diversão').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 1 de ${readdirSync('./src/lib/commands/').length-1}`)
                                    .setColor(msg.config.colors.padrão)
                                    .setTimestamp()
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/588121041029824534.png?v=1')
                                )
                            break;
                            case '598130455602003969'://game
                            r.remove(msg.author.id)
                            m.edit(
                                new RichEmbed()
                                .setTitle('Categoria: Game')
                                .setDescription(msg.bot.commands.filter(c => c.help.category === 'game').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                .setFooter(`Pagina 2 de ${readdirSync('./src/lib/commands/').length-1}`)
                                .setColor(msg.config.colors.padrão)
                                .setTimestamp()
                                .setThumbnail(msg.bot.user.displayAvatarURL)
                                .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                .setThumbnail('https://cdn.discordapp.com/emojis/598130455602003969.png?v=1')
                            )
                        break;
                            case '587008691044352034'://imagem
                                r.remove(msg.author.id)
                                m.edit(
                                    new RichEmbed()
                                    .setTitle('Categoria: Imagem/Gif')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'imagens').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 3 de ${readdirSync('./src/lib/commands/').length-1}`)
                                    .setColor(msg.config.colors.padrão)
                                    .setTimestamp()
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/587008691044352034.png?v=1')
                                )
                            break;
                            case '586617373835132930'://informações
                                r.remove(msg.author.id)
                                m.edit(
                                    new RichEmbed()
                                    .setTitle('Categoria: Informação')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'informações').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 4 de ${readdirSync('./src/lib/commands/').length-1}`)
                                    .setColor(msg.config.colors.padrão)
                                    .setTimestamp()
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/586617373835132930.png?v=1')
                                )
                            break;
                            case '597150527905857538'://moderação
                                r.remove(msg.author.id)
                                m.edit(
                                    new RichEmbed()
                                    .setTitle('Categoria: Moderação')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'moderação').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 5 de ${readdirSync('./src/lib/commands/').length-1}`)
                                    .setColor(msg.config.colors.padrão)
                                    .setTimestamp()
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/597150527905857538.png?v=1')
                                )
                            break;
                            case '597527165503799307'://nsfw
                                r.remove(msg.author.id)
                                if (!msg.channel.nsfw) {
                                    m.edit(
                                        new RichEmbed()
                                        .setColor(msg.config.colors.vermelho)
                                        .setDescription('Você precisa estar em um chat `NSFW` para ver estes comandos.')
                                    )
                                } else {
                                    m.edit(
                                        new RichEmbed()
                                        .setTitle('Categoria: NSFW')
                                        .setDescription(msg.bot.commands.filter(c => c.help.category === 'nsfw').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                        .setFooter(`Pagina 6 de ${readdirSync('./src/lib/commands/').length-1}`)
                                        .setColor(msg.config.colors.padrão)
                                        .setTimestamp()
                                        .setThumbnail(msg.bot.user.displayAvatarURL)
                                        .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                        .setThumbnail('https://cdn.discordapp.com/emojis/597527165503799307.png?v=1')
                                    )
                                }
                            break;
                            case '586614384269197312'://search
                                r.remove(msg.author.id)
                                m.edit(
                                    new RichEmbed()
                                    .setTitle('Categoria: Search')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'search').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 7 de ${readdirSync('./src/lib/commands/').length-1}`)
                                    .setColor(msg.config.colors.padrão)
                                    .setTimestamp()
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/586614384269197312.png?v=1')
                                )
                            break;
                            case '586617373780344855'://utilidades
                                r.remove(msg.author.id)
                                m.edit(
                                    new RichEmbed()
                                    .setTitle('Categoria: Utilidade')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'utilidades').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 8 de ${readdirSync('./src/lib/commands/').length-1}`)
                                    .setColor(msg.config.colors.padrão)
                                    .setTimestamp()
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/586617373780344855.png?v=1')
                                )
                            break;
                            case '587705509344313402'://retornar
                                r.remove(msg.author.id)
                                m.edit(
                                    new RichEmbed()
                                    .setDescription(stripIndents`
                                    ${msg.config.e_men.cmd} \`|\` Total de comandos: \`${msg.bot.commands.size-2}\`.
                                    ${msg.config.e_men.pasta} \`|\` Total de categorias: \`${readdirSync('./src/lib/commands/').length-1}\`.
                                    ${msg.config.e_men.util} \`|\` Prefixo neste servidor: \`${msg.config.prefix}\`.
                                    ${msg.config.e_men.add} \`|\` Clique nas reações para ter mais informações de uma categoria.
                                    `)
                                    .setTitle('Este são todos os meus comandos.')
                                    .addField(`<:funny_:588121041029824534> Diversão [${readdirSync('./src/lib/commands/diversão').length}]:`, readdirSync('./src/lib/commands/diversão').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:game_:598130455602003969>Game [${readdirSync('./src/lib/commands/game').length}]`, readdirSync('./src/lib/commands/game').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:insta_:587008691044352034> Imagem/Gif [${readdirSync('./src/lib/commands/imagens').length}]:`, readdirSync('./src/lib/commands/imagens').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:info_:586617373835132930> Informação [${readdirSync('./src/lib/commands/informações').length}]:`, readdirSync('./src/lib/commands/informações').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:moderador_:597150527905857538> Moderação [${readdirSync('./src/lib/commands/moderação').length}]:`, readdirSync('./src/lib/commands/moderação').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:menor18_:597527165503799307> NSFW [${readdirSync('./src/lib/commands/nsfw').length}]:`, msg.channel.nsfw ? readdirSync('./src/lib/commands/nsfw').map(c => `\`${c.split('.')[0]}\``).join(', ') : '*Você precisa estar em um chat `NSFW` para ver estes comandos.*')
                                    .addField(`<:kanna_search_:586614384269197312> Search [${readdirSync('./src/lib/commands/search').length}]:`, readdirSync('./src/lib/commands/search').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:util_:586617373780344855> Utilidade [${readdirSync('./src/lib/commands/utilidades').length}]:`, readdirSync('./src/lib/commands/utilidades').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .setFooter('Os emojis serão removidos em dentro de um minuto.',msg.author.displayAvatarURL)
                                    .setColor(msg.config.colors.padrão)
                                    .setTimestamp()
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setFooter(`Pagina 0 de ${readdirSync('./src/lib/commands/').length-1}`)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,'https://cdn.discordapp.com/emojis/586617374141186097.png?v=1')
                                )
                            break;
                        }
                    })
                    setTimeout(() => {
                        m.clearReactions();
                    }, 60000)
                })
            })
        } else {
            let cmd = msg.bot.commands.get(msg.args[0].toLowerCase()) || msg.bot.commands.get(msg.bot.aliases.get(msg.args[0].toLowerCase()));
            if (!cmd) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, entrada inválida. Tente utilizar apenas caracteres minúsculos.`);
            if (!cmd.conf.hide_help) return;
            if ((cmd.conf.nsfw && !msg.channel.nsfw)) return;
            let guildOnly; if (cmd.conf.guildOnly)  guildOnly  = msg.config.e_men.desativado;if (!cmd.conf.guildOnly) guildOnly  = msg.config.e_men.ativado;
            let manutenção;if (cmd.conf.manu)       manutenção = msg.config.e_men.ativado;   if (!cmd.conf.manu)      manutenção = msg.config.e_men.desativado;
            let _enable;   if (!cmd.conf.enable)    _enable    = msg.config.e_men.desativado;if (cmd.conf.enable)     _enable    = msg.config.e_men.ativado;
            let nsfw;      if (cmd.conf.nsfw)       nsfw       = msg.config.e_men.ativado;   if (!cmd.conf.nsfw)      nsfw       = msg.config.e_men.desativado;
            embed.setDescription(`\`<>\`: obrigatório / \`[]\`: opcional`);
            embed.addField(`${msg.config.e_men._info} | Informações`, stripIndents`
            ${msg.config.e_men._seta} Nome: ${cmd.help.name.slice(0, 1).toUpperCase() + cmd.help.name.slice(1)}
            ${msg.config.e_men._seta} Aliases: ${cmd.conf.aliases.map(a => '`'+a+'`').join(', ')}
            ${msg.config.e_men._seta} Descrição: ${cmd.help.description}
            ${msg.config.e_men._seta} Categoria: ${cmd.help.category}`);
            embed.addField(`${msg.config.e_men.util} | Utilização`, stripIndents`
            ${msg.config.e_men._seta} Form${cmd.help.usage.length === 1 ? 'a' : 'as'} de uso:
            ${cmd.help.usage.map(a => `${msg.config.e_men._invisivel}• \`${msg.config.prefix+a}\``).join('\n')}
            ${msg.config.e_men._seta} Acessível por: ${cmd.help.member}`);
            embed.addField(`${msg.config.e_men.configs} | Configurações`, stripIndents`
            ${msg.config.e_men._seta} DM: ${guildOnly}
            ${msg.config.e_men._seta} Manutenção: ${manutenção}
            ${msg.config.e_men._seta} Habilitado: ${_enable}
            ${msg.config.e_men._seta} NSFW: ${nsfw}`);
            embed.setFooter(`© ${msg.bot.user.username}`, msg.author.displayAvatarURL)
            return msg.channel.send(embed);
        }
    },
    conf:{
        aliases: ['help','comandos'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 30
    },
    help: {
        name: 'ajuda',
        description: 'veja todos os meus comandos',
        usage: ['ajuda','ajuda [comando]'],
        member: 'usuários',
        category: 'informações'
    }
}