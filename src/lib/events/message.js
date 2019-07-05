const config = require('../../util/config');
//const database = require('firebase').database();

module.exports = async function (bot, msg){
    if (msg.author.bot) return;
    if (!msg.content.startsWith(config.prefix)) {
        if (msg.content.startsWith('<@577134698325606400>')) return msg.channel.send(`${config.e_men.bot_mention} \`|\` ${msg.author}, meu config.prefixo é \`${config.prefix}\`, para saber meus comandos use \`${config.prefix}help\`.`);
    } else {
        const args = msg.content.slice(config.prefix.length).trim().split(/\s+/g);
        const comando = args.shift().toLowerCase();
        const cmd = bot.commands.get(comando || bot.aliases.get(comando));
        Object.defineProperties(msg,{
            'args':{value:args},
            'bot':{value:bot},
            'config':{value:config},
            //'database':{value:database}
        })
        if (!cmd) return;
        if (cmd.conf.ownerOnly && ![config.owner_id[0]].some(id => msg.author.id == id)) return msg.channel.send(`${config.e_men.errado} \`|\` ${msg.author}, apenas meu criador pode usar este comando.`);
        if (cmd.conf.guildOnly && msg.channel.type == 'dm') return msg.channel.send(`${config.e_men.errado} \`|\` ${msg.author}, você não pode usar este comando no meu DM.`);
        if (cmd.conf.manu && ![config.owner_id[0]].some(id => msg.author.id == id)) return msg.channel.send(`${config.e_men.manutenção} \`|\` ${msg.author}, este comando esta em manutenção.`);
        if (!cmd.conf.enable && ![config.owner_id[0]].some(id => msg.author.id == id)) return msg.channel.send(`${config.e_men.desativado} \`|\` ${msg.author}, este comando esta desabilitado.`);
        if ((cmd.conf.nsfw && !msg.channel.nsfw) && (cmd.conf.nsfw && msg.channel.type != 'dm')) return msg.channel.send(`${config.e_men.errado} \`|\` ${msg.author}, você deve estar um chat \`NSFW\` para usar este comando.`);
        if (bot.cooldowns.get(cmd.conf.helper.name)) bot.cooldowns.set(cmd.conf.helper.name, new (require('discord.js').Collection)());
        const now = Date.now();
        const timestamps = bot.cooldowns.get(cmd.conf.helper.name);
        const cooldownAmount = (cmd.conf.cooldown || 3) * 1000;
        if (timestamps.has(msg.author.id)) {
            const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return msg.channel.send(`${config.e_men.timer} \`|\` ${msg.author}, espere \`${timeLeft.toFixed(1)}\` para executar o comando \`${comando}\` novamente.`);
            }
        }
        timestamps.set(msg.author.id, now)
        setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
        try { cmd.run(msg) } catch (e) { bot.guilds.get('586610890288136202').channels.get('588804651328208907').send(`\nComando: ${comando}\nUsuário: ${msg.author.tag}\nErro:\n\`\`\`js\n${e.stack}\`\`\``) }
    }
}