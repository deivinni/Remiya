const { readdirSync } = require('fs');

module.exports = {
    run: async(msg) => {
        const path = msg.args[0];
        const cmd = msg.args[1];
        if (!path) {
            msg.channel.send(`${msg.config.e_men.pasta} \`|\` ${msg.author}, estas são as pastas de comandos: ${readdirSync('./src/lib/commands').map(a => `\`${a}\``).join(', ')}`);
        } else {
            if (!cmd) {
                msg.channel.send(`${msg.config.e_men.cmd} \`|\` ${msg.author}, estes são os comandos da pasta **${path}**: ${readdirSync(`./src/lib/commands/${path}`).map(a => `\`${a}\``.replace('.js','')).join(', ')}`);
            } else {
                try {
                    console.log(`--- Comando recarregado: ${cmd}`);
                    delete require.cache[require.resolve(`../${path}/${cmd}.js`)];
                    const pull = require(`../${path}/${cmd}.js`);
                    msg.bot.commands.delete(cmd);
                    msg.bot.commands.set(cmd, pull);
                    msg.channel.send(`${msg.config.e_men.reload_} \`|\` ${msg.author}, comando \`${cmd}\` recarregado com sucesso.`);
                } catch (e) {
                    msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não foi possivel recarregar \`${cmd}\`.\nPor causa do seguinte erro: \`${e}\``);
                    console.log(e.stack);
                }
            }
        }
    },
    conf: {
        aliases: ['recarregar'],
        nsfw: false,
        ownerOnly: true,
        guildOnly: false,
        manu: false,
        enable: true,
        hide_help: false,
        cooldown: 3
    },
    help: {
        name: 'reload',
        description: 'recarregue um comando sem ter que me reiniciar',
        member: 'criador',
        usage: ['reload','reload [pasta]','reload [pasta] [comando]'],
        category: 'owner',
    }
}