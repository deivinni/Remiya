const qs = require('querystring');
const request = require('request');

module.exports = {
    run: async(msg) => {
        try {
            if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_me.errado} \`|\` ${msg.author}, favor coloque algo que deseje pesquisar no discord-js.`);
            msg.channel.startTyping(true);
            let query = qs.stringify({
                src: 'https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json',
                q: msg.args.join(' ')
            });
            await request({
                url: `https://djsdocs.sorta.moe/v2/embed?${query}`,
                json: true
            }, async(req, res, json) => {
                if (!json) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possível encontrar algo sobre: \`${msg.args.join(' ')}\``);
                await msg.channel.send({ embed: json });
                msg.channel.stopTyping(true);
            })
        } catch (e) {
            msg.channel.send(`${config.e_men.errado} \`|\` ${msg.author}, ocorreu um erro inesperado ao executar este comando. Tente novamente mais tarde!`);
        }
    },
    conf:{ aliases: ['djs'], enable: true, cooldown: 5 },
    help: {
       name: 'docs',
       description: 'pesquise por algo no discord.js',
       usage: ['docs <pesquisa>'],
       member: 'desemvolvedores',
       category: 'search',
       credit: ['[Discord.js](https://discord.js.org/)']
    }
}