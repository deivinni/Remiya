module.exports = {
  run: async(msg) => {
    msg.delete()
    if (!['267064233102016514'].some(id => msg.author.id == id)) return;
    msg.channel.send('<@308287298632417291>, VAI TOMA NO CU!')
  },
  conf:{ enable: true, cowldoon: 10 },
  help: {
    name: 'caio',
    description: 'manda o caio toma no cu',
    member: 'HPBGalactico',
    category: 'diversão'
  }
}