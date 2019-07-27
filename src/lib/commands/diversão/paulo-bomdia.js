module.exports = {
  run: async(msg) => {
    msg.delete();
    if (!['414175662044086272'].some(id => msg.author.id == id)) return;
    msg.channel.send('BOM DIA!')
  },
  conf:{ enable: true },
  help: {
    name: 'paulo-bomdia',
    description: 'manda um bom dia do paulo',
    member: 'Paulo',
    category: 'diversão'
  }
}