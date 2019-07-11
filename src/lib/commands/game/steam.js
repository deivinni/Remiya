const snekfetch = require('snekfetch');

module.exports = {
    run: async(msg) => {
        const query = msg.args.join(' ');
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar o jogo desejado.`);
        const search = await snekfetch
        .get('https://store.steampowered.com/api/storesearch')
        .query({cc: 'br',l: 'pt',term: query});
        if (!search.body.items.length) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, não encontrei nenhum jogo com este nome: \`${query}\`.`);
        const { id, tiny_image } = search.body.items[0];
        const { body } = await snekfetch.get('https://store.steampowered.com/api/appdetails').query({ appids: id });
        const { data } = body[id.toString()];
        const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Gratuito';
        const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Gratuito';
        const price = current === original ? current : `~~${original}~~ ${current}`;
        const platforms = [];
        if (data.platforms) {
            if (data.platforms.windows) platforms.push('Windows');
            if (data.platforms.mac) platforms.push('Mac');
            if (data.platforms.linux) platforms.push('Linux');
        }
        msg.channel.send(
            new (require('discord.js').RichEmbed)()
            .setColor(0x101D2F)
            .setAuthor('Steam', msg.bot.user.displayAvatarURL, 'http://store.steampowered.com/')
            .setThumbnail('https://i.imgur.com/xxr2UBZ.png')
            .setTitle(`Jogo: ${data.name}`).setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
            .setImage(`${tiny_image}`.replace('231','616').replace('87','353'))
            .setFooter(msg.author.tag, msg.author.displayAvatarURL).setTimestamp()
            .addField('<:seta_:586617374136991768>Preço', price, true)
            .addField('<:seta_:586617374136991768>Avaliação', data.metacritic ? data.metacritic.score : '???', true)
            .addField('<:seta_:586617374136991768>Recomedações', data.recommendations ? data.recommendations.total : '???', true)
            .addField('<:seta_:586617374136991768>Plataformas', platforms.join(', ') || 'nenhuma', true)
            .addField('<:seta_:586617374136991768>Data de lançamento', data.release_date ? data.release_date.date : '???', true)
            .addField('<:seta_:586617374136991768>Total de DLCs', data.dlc ? data.dlc.length : 0, true)
            .addField('<:seta_:586617374136991768>Desenvolvedores', data.developers ? data.developers.join(', ') || '???' : '???', true)
            .addField('<:seta_:586617374136991768>Editoras', data.publishers ? data.publishers.join(', ') || '???' : '???', true)
        )
    },
    conf:{
        aliases: [],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 5
    },
    help: {
       name: 'steam',
       description: 'pesquise por algum jogo na steam.',
       usage: ['steam <jogo>'],
       member: 'usuários',
       category: 'game'
    }
}