module.exports = {
    _id: String,
    ban: { type: Boolean, default: false },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    coins: { type: Number, default: 0 },
    army: { type: String, default: '0' },
    sobre: { type: String, default: 'Sobre indefinido.' },
    casado: { type: Boolean, default: false },
    esposa: { type: String, default: '0' },
    color: { type: String, default: require('../../config').colors.PADRÃO },
    premium: { type: Boolean, default: false },
    underage: { type: Boolean, default: true },
    background: { type: String, default: 'https://images3.alphacoders.com/102/thumb-1920-1028801.jpg' }
}