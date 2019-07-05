const { RichEmbed }    = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    run: async(msg) => {
        const embed = new RichEmbed()
        .setColor(msg.config.colors.padrão)
        .setThumbnail(msg.bot.user.displayAvatarURL)
        .setTimestamp()
        .setAuthor(`Comandos da ${msg.bot.user.username}`, 'https://cdn.discordapp.com/emojis/586617374141186097.png?v=1')
        if (msg.args[0]) {
            let cmd = msg.bot.commands.get(msg.args[0]);
            if (!cmd) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, entrada inválida. Tente utilizar apenas caracteres minúsculos.`);
            if (!cmd.conf.hide_help) return;
            if ((cmd.conf.nsfw && !msg.channel.nsfw)) return;
            let guildOnly; if (cmd.conf.guildOnly)  guildOnly  = msg.config.e_men.desativado;if (!cmd.conf.guildOnly) guildOnly  = msg.config.e_men.ativado;
            let manutenção;if (cmd.conf.manu)       manutenção = msg.config.e_men.ativado;   if (!cmd.conf.manu)      manutenção = msg.config.e_men.desativado;
            let _enable;   if (!cmd.conf.enable)    _enable    = msg.config.e_men.desativado;if (cmd.conf.enable)     _enable    = msg.config.e_men.ativado;
            let nsfw;      if (cmd.conf.nsfw)       nsfw       = msg.config.e_men.ativado;   if (!cmd.conf.nsfw)      nsfw       = msg.config.e_men.desativado;
            embed.setDescription(`\`<>\`: obrigatório / \`[]\`: opcional`);
            embed.addField(`${msg.config.e_men._info} | Informações`, stripIndents`
            ${msg.config.e_men._seta} Nome: ${cmd.conf.helper.name.slice(0, 1).toUpperCase() + cmd.conf.helper.name.slice(1)}
            ${msg.config.e_men._seta} Aliases: ${cmd.conf.aliases.map(a => '`'+a+'`').join(', ') || 'sem aliases'}
            ${msg.config.e_men._seta} Descrição: ${cmd.conf.helper.description || 'sem descrição'}
            ${msg.config.e_men._seta} Categoria: ${cmd.conf.helper.category}
            `);
            embed.addField(`${msg.config.e_men.util} | Utilização`, stripIndents`
            ${msg.config.e_men._seta} Formas de uso:
            ${cmd.conf.helper.usage.map(a => `${msg.config.e_men._invisivel}• \`${msg.config.prefix+a}\``).join('\n') || 'sem forma de uso'}
            ${msg.config.e_men._seta} Acessível por: ${cmd.conf.helper.member || 'sem membro expecífico'}
            `);
            embed.addField(`${msg.config.e_men.configs} | Configurações`, stripIndents`
            ${msg.config.e_men._seta} DM: ${guildOnly}
            ${msg.config.e_men._seta} Manutenção: ${manutenção}
            ${msg.config.e_men._seta} Habilitado: ${_enable}
            ${msg.config.e_men._seta} NSFW: ${nsfw}
            `);
            embed.setFooter(`© ${msg.bot.user.username}`, msg.author.displayAvatarURL)
            return msg.channel.send(embed);
        } else {
            embed.setDescription(stripIndents`
            ${msg.config.e_men.cmd} \`|\` Total de comandos: \`${msg.bot.commands.size}\`.
            ${msg.config.e_men.cmd} \`|\` Use \`${msg.config.prefix}help [comando]\` para mais informações.
            ${msg.config.e_men.util} \`|\` Prefixo: \`${msg.config.prefix}\`.
            `);
            embed.setTitle('Estes são todos os meus comandos.');
            embed.setFooter(msg.author.tag, msg.author.displayAvatarURL);
            const dir_div  = msg.bot.commands.filter(c => c.conf.helper.category === 'diversão');
            const dir_img  = msg.bot.commands.filter(c => c.conf.helper.category === 'imagens');
            const dir_info = msg.bot.commands.filter(c => c.conf.helper.category === 'informações');
            const dir_util = msg.bot.commands.filter(c => c.conf.helper.category === 'utilidades');
            const dir_nsfw = msg.bot.commands.filter(c => c.conf.helper.category === 'nsfw');
            const dir_sea  = msg.bot.commands.filter(c => c.conf.helper.category === 'search');
            try {
                embed.addField(`<:funny_:588121041029824534> Diversão [${dir_div.size}]:`, `${dir_div.map(c => '`'+c.conf.helper.name+'`').join(', ')}`.replace('\`caio\`','').replace('\`paulo-bomdia\`',''));
                embed.addField(`${msg.config.e_men.instagram} Imagem/Gif [${dir_img.size}]:`, dir_img.map(c => '`'+c.conf.helper.name+'`').join(', '));
                embed.addField(`${msg.config.e_men._info} Informações [${dir_info.size}]:`, dir_info.map(c => '`'+c.conf.helper.name+'`').join(', '));
                embed.addField(`🔞 NSFW [${dir_nsfw.size}]:`, msg.channel.nsfw ? dir_nsfw.map(c => '`'+c.conf.helper.name+'`').join(', ') : `Os meus comandos \`NSFW\` só seram mostrados em um chat \`NSFW\`.`);
                embed.addField(`<:kanna_search_:586614384269197312> Search [${dir_sea.size}]:`, dir_sea.map(c => '`'+c.conf.helper.name+'`').join(', '));
                embed.addField(`${msg.config.e_men.util} Utilidades [${dir_util.size}]:`, dir_util.map(c => '`'+c.conf.helper.name+'`').join(', '));
            } catch (e) {
                console.log(e)
            }
            return msg.channel.send(embed);
        }
    },
    conf: {
        aliases: ['ajuda', 'comandos'],
        nsfw: false,
        ownerOnly: false,
        guildOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 3,
        helper: {
            name: 'help',
            description: 'veja todos os meus comandos',
            usage: ['help','help [comando]'],
            member: 'usuários',
            category: 'informações',
        }
    }
}