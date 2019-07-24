module.exports = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    owner_id: [process.env.OWNER_ID],
    server_id: process.env.SERVER_ID,
    server_invite: process.env.SERVER_INVITE,
    bot_invite: process.env.BOT_INVITE,
    e_men: require('./assets/EmojisMentions.js'),
    e_id: require('./assets/EmojisIDs.js'),
    get_images: require('./assets/GetImages.js'),
    colors:{
        PADRÃO: 0x3F68D9,
        PRETO: 0x000000,
        BRANCO: 0xFFFFFF,
        AMARELO: 0xF0F72A,
        VERMELHO: 0xDB5E5E,
        VERDE: 0x2DF74C,
        AZUL: 0x2D3DF7,
    }
}