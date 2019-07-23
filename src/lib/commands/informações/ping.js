module.exports = {
    run: async(msg) => {
        let shard_ping = await msg.bot.shard.broadcastEval('this.ping')
          , args_ping = msg.args[0] ? parseInt(msg.args[0]) - 1 : 1
          , select_ping = msg.args[0] ? shard_ping[parseInt(args_ping)] ? parseInt(args_ping) : msg.bot.shard.id : msg.bot.shard.id
          , final_ping = shard_ping[select_ping];
        msg.channel.send(`${msg.config.e_men.ping} \`|\` ${msg.author}, minha latência no shard \`${select_ping+1}\` é \`${parseInt(final_ping)}\` ms!`);
        //msg.channel.send(`${msg.config.e_men.ping} \`|\` ${msg.author}, minha latência é \`${Math.ceil(msg.bot.ping)}\` ms!`);
    },
    conf:{ aliases: ['latency'], enable: true, hide_help: true, cooldown: 10 },
    help: {
        name: 'ping',
        description: 'veja a minha latência',
        member: 'usuários',
        category: 'informações',
        usage: ['ping [shard]']
    }
}