const reddit = require('random-puppy');
const { RemiyaEmbed } = require('../../../util/functions/index');

module.exports = {
  run: async(msg) => {
    const search = msg.args[0];
    if (!search) {
      msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve digitar um SubReddit para mim pesquisar.`);
    } else {
      const image = await reddit(search)
      const embed = new RemiyaEmbed(msg.author)
      .setColor('ORANGE')
      .setAuthor(`Reddit: ${search}`, 'https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-114x114.png')
      .setDescription(`Reaja em ${msg.config.e_men.reload_} para trocar a imagem.`)
      if (!image) {
        return msg.channel.send(
          embed
            .setDescription(`Nenhuma imagem do SubReddit ${search}, foi encontrada.`)
            .setColor('RED')
        );
      } else {
        await msg.channel.send(embed.setImage(image)).then(message => {
          message.react(msg.config.e_id.reload_)
          const collector = message.createReactionCollector((r ,u) => (u.id != msg.bot.user.id && u.id == msg.author.id) && (r.emoji.id == msg.config.e_id.reload_), {time:60*1000});
          collector.on('collect', async (r) => {
            switch (r.emoji.id) {
              case msg.config.e_id.reload_:
                let new_image = await reddit(search);
                r.remove(msg.author.id)
                await message.edit(embed.setImage(new_image));
              break;
            }
          })
          setTimeout(() => {
            message.clearReactions();
            message.edit(embed.setDescription(''));
          }, 60*1000)
        })
      }
    }
  },
  conf:{ enable: true, cooldown: 60 },
  help: {
      name: 'reddit',
      description: 'pesquise por imagens no reddit',
      usage: ['reddit <SubReddit>'],
      member: 'usuários',
      category: 'diversão'
  }
}