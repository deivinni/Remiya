module.exports = {
    run: async(msg) => {
        let toEval = msg.args.join(' ');
        if (toEval.includes('msg.bot.token') || toEval.includes('msg.guild.leave()')) {
            msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, talvez um outro dia.`);
        } else {
            try {
                let evaluated = require('util').inspect(eval(toEval, {depth: 0}))
                if(!toEval){
                    msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, coloque o código para mim avaliar.`);
                } else {
                    let time_start = process.hrtime()
                    let time_diff = process.hrtime(time_start)
                    let executed = `${time_diff[0] > 0 ? +'`'+time_diff[0]+'`s' : ''}\`${time_diff[1] / 1000000}\`ms`
                    msg.channel.send(`\`\`\`js\n${evaluated}\`\`\``, {maxLenght: 2000}) && 
                    msg.author.send(
                        `**Executado em**: ${executed}\n`+
                        `**Tipo**: ${typeof evaluated}\n`+
                        `**Resultado**: \`\`\`js\n${evaluated}\`\`\``, {
                            maxLenght: 2000
                        }
                    )
                }
            } catch (e) {
                msg.channel.send(`\`\`\`js\n${e}\n\`\`\``) && 
                msg.author.send(`\`\`\`js\n${e.stack}\n\`\`\``, {maxLenght: 2000});
            }
        }
    },
    conf: {
        aliases: ['debug'],
        nsfw: false,
        ownerOnly: true,
        guildOnly: false,
        manu: false,
        enable: true,
        hide_help: false,
        cooldown: 3,
        helper: {
            name: 'eval',
            description: 'um terminal no discord \'-\'',
            member: 'criador',
            usage: ['eval <código>'],
            category: 'owner',
        }
    }
}