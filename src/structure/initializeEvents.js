const { readdirSync } = require('fs')

module.exports = (bot) => {
    const events = readdirSync(`./src/lib/events/`).filter(x => x.endsWith('.js'));
    for (const file of events) {
        const _event = require(`../lib/events/${file}`)
        bot.on(file.split('.')[0], _event.bind(null, bot))
    }
}