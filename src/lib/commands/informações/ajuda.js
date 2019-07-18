const { readdirSync } = require('fs');
const { RemiyaEmbed } = require('../../../util/functions/index');

module.exports = {
    run: async(msg) => {
        const embed = new RemiyaEmbed(msg.author)
        .setThumbnail(msg.bot.user.displayAvatarURL)
        .setAuthor(`Comandos da ${msg.bot.user.username}`,'https://cdn.discordapp.com/emojis/586617374141186097.png?v=1')
        if (!msg.args[0]) {
            msg.channel.send(
                embed.setDescriptionArray([[
                    `${msg.config.e_men.cmd} \`|\` Total de comandos: \`${msg.bot.commands.size-2}\`.`,
                    `${msg.config.e_men.pasta} \`|\` Total de categorias: \`${readdirSync('./src/lib/commands/').length-1}\`.`,
                    `${msg.config.e_men.util} \`|\` Prefixo neste servidor: \`${msg.config.prefix}\`.`,
                    `${msg.config.e_men.add} \`|\` Clique nas reações para ter mais informações de uma categoria.`
                ]])
                .setTitle('Este são todos os meus comandos.')
                .addField(`<:funny_:588121041029824534> Diversão [${readdirSync('./src/lib/commands/diversão').length}]:`, readdirSync('./src/lib/commands/diversão').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:game_:598130455602003969>Game [${readdirSync('./src/lib/commands/game').length}]`, readdirSync('./src/lib/commands/game').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:insta_:587008691044352034> Imagem/Gif [${readdirSync('./src/lib/commands/imagens').length}]:`, readdirSync('./src/lib/commands/imagens').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:informacoes_:599308751681355776> Informação [${readdirSync('./src/lib/commands/informações').length}]:`, readdirSync('./src/lib/commands/informações').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:moderador_:597150527905857538> Moderação [${readdirSync('./src/lib/commands/moderação').length}]:`, readdirSync('./src/lib/commands/moderação').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:menor18_:597527165503799307> NSFW [${readdirSync('./src/lib/commands/nsfw').length}]:`, msg.channel.nsfw ? readdirSync('./src/lib/commands/nsfw').map(c => `\`${c.split('.')[0]}\``).join(', ') : '*Você precisa estar em um chat `NSFW` para ver estes comandos.*')
                .addField(`<:kanna_search_:586614384269197312> Search [${readdirSync('./src/lib/commands/search').length}]:`, readdirSync('./src/lib/commands/search').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .addField(`<:util_:586617373780344855> Utilidade [${readdirSync('./src/lib/commands/utilidades').length}]:`, readdirSync('./src/lib/commands/utilidades').map(c => `\`${c.split('.')[0]}\``).join(', '))
                .setFooter('Os emojis serão removidos em dentro de um minuto.',msg.author.displayAvatarURL)
            ).then(m => {
                m.react('588121041029824534').then(() => m.react('598130455602003969')).then(() => m.react('587008691044352034')).then(() => m.react('599308751681355776')).then(() => m.react('597150527905857538')).then(() => m.react('597527165503799307')).then(() => m.react('586614384269197312')).then(() => m.react('586617373780344855')).then(() => m.react('599308751715041280')).then(() => {
                    const collector = m.createReactionCollector((r,u) => (r.emoji.id === '588121041029824534','598130455602003969','587008691044352034','599308751681355776','597150527905857538','586614384269197312','586617373780344855','597527165503799307','599308751715041280') && (u.id == msg.author.id), {time:60000});
                    collector.on('collect', (r) => {
                        switch(r.emoji.id) {
                            case '588121041029824534'://diversão
                                r.remove(msg.author.id)
                                m.edit(
                                    new RemiyaEmbed(msg.author)
                                    .setTitle('Categoria: Diversão')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'diversão').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 1 de ${readdirSync('./src/lib/commands/').length-1}`, msg.author.displayAvatarURL)
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/588121041029824534.png?v=1')
                                )
                            break;
                            case '598130455602003969'://game
                            r.remove(msg.author.id)
                            m.edit(
                                new RemiyaEmbed(msg.author)
                                .setTitle('Categoria: Game')
                                .setDescription(msg.bot.commands.filter(c => c.help.category === 'game').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                .setFooter(`Pagina 2 de ${readdirSync('./src/lib/commands/').length-1}`, msg.author.displayAvatarURL)
                                .setThumbnail(msg.bot.user.displayAvatarURL)
                                .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                .setThumbnail('https://cdn.discordapp.com/emojis/598130455602003969.png?v=1')
                            )
                        break;
                            case '587008691044352034'://imagem
                                r.remove(msg.author.id)
                                m.edit(
                                    new RemiyaEmbed(msg.author)
                                    .setTitle('Categoria: Imagem/Gif')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'imagens').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 3 de ${readdirSync('./src/lib/commands/').length-1}`, msg.author.displayAvatarURL)
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/587008691044352034.png?v=1')
                                )
                            break;
                            case '599308751681355776'://informações
                                r.remove(msg.author.id)
                                m.edit(
                                    new RemiyaEmbed(msg.author)
                                    .setTitle('Categoria: Informação')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'informações').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 4 de ${readdirSync('./src/lib/commands/').length-1}`, msg.author.displayAvatarURL)
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/599308751681355776.png?v=1')
                                )
                            break;
                            case '597150527905857538'://moderação
                                r.remove(msg.author.id)
                                m.edit(
                                    new RemiyaEmbed(msg.author)
                                    .setTitle('Categoria: Moderação')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'moderação').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 5 de ${readdirSync('./src/lib/commands/').length-1}`, msg.author.displayAvatarURL)
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/597150527905857538.png?v=1')
                                )
                            break;
                            case '597527165503799307'://nsfw
                                r.remove(msg.author.id)
                                if (!msg.channel.nsfw) {
                                    m.edit(
                                        new RemiyaEmbed()
                                        .setColor(msg.config.colors.VERMELHO)
                                        .setDescription('Você precisa estar em um chat `NSFW` para ver estes comandos.')
                                    )
                                } else {
                                    m.edit(
                                        new RemiyaEmbed(msg.author)
                                        .setTitle('Categoria: NSFW')
                                        .setDescription(msg.bot.commands.filter(c => c.help.category === 'nsfw').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                        .setFooter(`Pagina 6 de ${readdirSync('./src/lib/commands/').length-1}`, msg.author.displayAvatarURL)
                                        .setThumbnail(msg.bot.user.displayAvatarURL)
                                        .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                        .setThumbnail('https://cdn.discordapp.com/emojis/597527165503799307.png?v=1')
                                    )
                                }
                            break;
                            case '586614384269197312'://search
                                r.remove(msg.author.id)
                                m.edit(
                                    new RemiyaEmbed(msg.author)
                                    .setTitle('Categoria: Search')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'search').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 7 de ${readdirSync('./src/lib/commands/').length-1}`, msg.author.displayAvatarURL)
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/586614384269197312.png?v=1')
                                )
                            break;
                            case '586617373780344855'://utilidades
                                r.remove(msg.author.id)
                                m.edit(
                                    new RemiyaEmbed(msg.author)
                                    .setTitle('Categoria: Utilidade')
                                    .setDescription(msg.bot.commands.filter(c => c.help.category === 'utilidades').map(c => `\`${c.help.name}\`: ${c.help.description}`).join('\n'))
                                    .setFooter(`Pagina 8 de ${readdirSync('./src/lib/commands/').length-1}`, msg.author.displayAvatarURL)
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,msg.bot.user.displayAvatarURL)
                                    .setThumbnail('https://cdn.discordapp.com/emojis/586617373780344855.png?v=1')
                                )
                            break;
                            case '599308751715041280'://retornar
                                r.remove(msg.author.id)
                                m.edit(
                                    new RemiyaEmbed(msg.author)
                                    .setDescriptionArray([[
                                        `${msg.config.e_men.cmd} \`|\` Total de comandos: \`${msg.bot.commands.size-2}\`.`,
                                        `${msg.config.e_men.pasta} \`|\` Total de categorias: \`${readdirSync('./src/lib/commands/').length-1}\`.`,
                                        `${msg.config.e_men.util} \`|\` Prefixo neste servidor: \`${msg.config.prefix}\`.`,
                                        `${msg.config.e_men.add} \`|\` Clique nas reações para ter mais informações de uma categoria.`
                                    ]])
                                    .setTitle('Este são todos os meus comandos.')
                                    .addField(`<:funny_:588121041029824534> Diversão [${readdirSync('./src/lib/commands/diversão').length}]:`, readdirSync('./src/lib/commands/diversão').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:game_:598130455602003969>Game [${readdirSync('./src/lib/commands/game').length}]`, readdirSync('./src/lib/commands/game').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:insta_:587008691044352034> Imagem/Gif [${readdirSync('./src/lib/commands/imagens').length}]:`, readdirSync('./src/lib/commands/imagens').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:informacoes_:599308751681355776> Informação [${readdirSync('./src/lib/commands/informações').length}]:`, readdirSync('./src/lib/commands/informações').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:moderador_:597150527905857538> Moderação [${readdirSync('./src/lib/commands/moderação').length}]:`, readdirSync('./src/lib/commands/moderação').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:menor18_:597527165503799307> NSFW [${readdirSync('./src/lib/commands/nsfw').length}]:`, msg.channel.nsfw ? readdirSync('./src/lib/commands/nsfw').map(c => `\`${c.split('.')[0]}\``).join(', ') : '*Você precisa estar em um chat `NSFW` para ver estes comandos.*')
                                    .addField(`<:kanna_search_:586614384269197312> Search [${readdirSync('./src/lib/commands/search').length}]:`, readdirSync('./src/lib/commands/search').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .addField(`<:util_:586617373780344855> Utilidade [${readdirSync('./src/lib/commands/utilidades').length}]:`, readdirSync('./src/lib/commands/utilidades').map(c => `\`${c.split('.')[0]}\``).join(', '))
                                    .setThumbnail(msg.bot.user.displayAvatarURL)
                                    .setFooter(`Pagina 0 de ${readdirSync('./src/lib/commands/').length-1}`, msg.author.displayAvatarURL)
                                    .setAuthor(`Comandos da ${msg.bot.user.username}`,'https://cdn.discordapp.com/emojis/586617374141186097.png?v=1')
                                )
                            break;
                        }
                    })
                    setTimeout(() => {
                        m.clearReactions();
                        m.edit(
                            embed
                                .setDescriptionArray([[
                                    `${msg.config.e_men.cmd} \`|\` Total de comandos: \`${msg.bot.commands.size-2}\`.`,
                                    `${msg.config.e_men.pasta} \`|\` Total de categorias: \`${readdirSync('./src/lib/commands/').length-1}\`.`,
                                    `${msg.config.e_men.util} \`|\` Prefixo neste servidor: \`${msg.config.prefix}\`.`
                                ]])
                                .setFooter(msg.author.tag,msg.author.displayAvatarURL)
                        )
                    }, 60000)
                })
            })
        } else {
            let cmd = msg.bot.commands.get(msg.args[0].toLowerCase()) || msg.bot.commands.get(msg.bot.aliases.get(msg.args[0].toLowerCase()));
            if (!cmd) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, entrada inválida. Tente utilizar apenas caracteres minúsculos.`);
            if (!cmd.conf.hide_help || (cmd.conf.nsfw && !msg.channel.nsfw)) return;
            embed.setDescription(`\`<>\`: obrigatório / \`[]\`: opcional`)
            .addFieldArray(`${msg.config.e_men._info} | Informações`, [[
                `${msg.config.e_men._seta}Nome: ${cmd.help.name.slice(0, 1).toUpperCase() + cmd.help.name.slice(1)}`,
                `${msg.config.e_men._seta}Aliases: ${cmd.conf.aliases.map(a => '`'+a+'`').join(', ') || 'sem aliases'}`,
                `${msg.config.e_men._seta}Descrição: ${cmd.help.description}`,
                `${msg.config.e_men._seta}Categoria: ${cmd.help.category}`
            ]])
            .addFieldArray(`${msg.config.e_men.util} | Utilização`, [[
                `${msg.config.e_men._seta}Form${cmd.help.usage.length === 1 ? 'a' : 'as'} de uso:`,
                `${cmd.help.usage.map(a => `${msg.config.e_men._invisivel}• \`${msg.config.prefix+a}\``).join('\n')}`,
                `${msg.config.e_men._seta}Acessível por: ${cmd.help.member}`
            ]])
            .addFieldArray(`${msg.config.e_men.configs} | Configurações`, [[
                `${msg.config.e_men._seta}DM: ${cmd.conf.guildOnly ? msg.config.e_men.desativado : msg.config.e_men.ativado}`,
                `${msg.config.e_men._seta}Manutenção: ${cmd.conf.manu ? msg.config.e_men.ativado : msg.config.e_men.desativado}`,
                `${msg.config.e_men._seta}Habilitado: ${cmd.conf.enable ? msg.config.e_men.ativado : msg.config.e_men.desativado}`,
                `${msg.config.e_men._seta}NSFW: ${cmd.conf.nsfw ? msg.config.e_men.ativado : msg.config.e_men.desativado}`
            ]])
            .setFooter(`© ${msg.bot.user.username}`, msg.author.displayAvatarURL)
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