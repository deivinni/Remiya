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
        padrão: 0xf25cb3,
        preto: 0x000000,
        branco: 0xffffff,
        amarelo: 0xf0f72a,
        vermelho: 0xcf72e2e,
        verde: 0x2df74c,
        azul: 0x2d3df7
    }
}