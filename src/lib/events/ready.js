const { prefix } = require('../../util/config');
module.exports = (bot) => {
    bot.user.setPresence({
        game:{
            name:`${prefix}ajuda | ${bot.users.size - bot.guilds.size} usuários!`,
            type: 'STREAMING',
            url: 'https://www.twitch.tv/deivinni_'
        }
    })
    console.log('- Carregando: comandos\n- Carregando: eventos\n- Carregando: client\n-- Inicializada com sucesso');
}