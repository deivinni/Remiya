const { font } = require('ascii-art');

module.exports = {
  run: async(msg) => {
    font(msg.args.join(' '), 'Doom', function(rendered){
      rendered = rendered.trimRight();
      if (rendered.length > 2000) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, esta mensagem é muito longa.`);
      msg.channel.send(rendered, {code: 'md'});
    })
  },
  conf:{ enable: true, cooldown: 10 },
  help: {
    name: 'ascii',
    description: 'crie uma mensagem ascii',
    usage: ['ascii <frase>'],
    member: 'usuários',
    category: 'diversão'
  }
}