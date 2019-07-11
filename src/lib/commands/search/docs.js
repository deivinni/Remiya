const request = require('request');

module.exports = {
    run: async(msg) => {
        try {
            if (!msg.args[0]) {
                msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar algo para nas documentações do discord.js.`);
            } else {
                request({
                    url: `https://djsdocs.sorta.moe/main/stable/embed?q=${encodeURIComponent(msg.args.join(' '))}`, 
                    json: true
                }, (req, res, json) => {
                        if (!json) {
                            msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não consegui encontrar nada.`);
                        }
                    msg.channel.send({embed: json});
                })
            }
        } catch (e) {
            msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possivel executar o comando, por causa do seguinte erro: \`${e}\``);
            console.log(e.stack);
        }
    },
    conf:{
        aliases: ['docs-djs'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 10
    },
    help: {
        name: 'docs',
        description: 'veja as documentações do discord.js',
        usage: ['docs <pesquisa>'],
        member: 'usuários',
        category: 'search'
    }
}