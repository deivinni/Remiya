const emojis = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];
function tabu(casas) {
    let retorno = '';
    for (let i = 0; i < 9; i++) {
        retorno += casas[i] ? casas[i] == 1 ? ':x:' : ':o:' : `${emojis[i]}`;
        retorno += (i == 2 || i == 5) ? '\n' : '';
    }
    return retorno;
}
function g(casas) {
    for (let i = 1; i < 3; i++) {
        if ((casas[0] == i && casas[1] == i && casas[2] == i) || (casas[3] == i && casas[4] == i && casas[5] == i) || (casas[6] == i && casas[7] == i && casas[8] == i)|| (casas[0] == i && casas[3] == i && casas[6] == i) || (casas[1] == i && casas[4] == i && casas[7] == i) || (casas[2] == i && casas[5] == i && casas[8] == i) ||(casas[0] == i && casas[4] == i && casas[8] == i) || (casas[2] == i && casas[4] == i && casas[6] == i)) return i;
        else if (casas[0] && casas[1] && casas[2] && casas[3] && casas[4] && casas[5] && casas[6] && casas[7] && casas[8]) return 3;
    }
    return null;
}
class jogo{
    constructor(p1, p2) {
        this.casas = [];
        this.x = p1;
        this.o = p2;
        this.turn = this.x;
        this.embed_1 = `\`Turno de: \`${this.x}[:x:]`
        this.embed_2 = `${tabu(this.casas)}`;
    }
    jogar(casa){
        if (this.casas[casa]) return null;
        this.casas[casa] = this.turn == this.x ? 1 : 2
        this.turn = this.turn == this.x ? this.o : this.x
        this.embed_1 = `\`Turno de: \`${this.turn == `${this.o}[:o:]` ? `${this.o}[:o:]` : `${this.x}[:x:]`}`
        this.embed_2 = `${tabu(this.casas)}`;
        let venceu = g(this.casas)
        if (venceu) {
            this.embed_1 = `${venceu == 1 ? `\`Vencedor:\` ${this.x}` : venceu == 3 ? `\`Empate\` entre ${this.x} e ${this.o}` : `\`Vencedor:\` ${this.o}`}`
            this.embed_2 = `${tabu(this.casas)}`;
            return 'g';
        }
        return true;
    }
    jogarBot(casa){
        if (this.casas[casa]) return null;
        this.casas[casa] = 1
        let a = () => {
            let numero = Math.floor(Math.random()*9)
            this.casas[numero] ? a() : this.casas[numero] = 2;
        }; a()
        this.embed_1 = `${this.x} contra ${this.o}`
        this.embed_2 = `${tabu(this.casas)}`
        let venceu = g(this.casas)
        if (venceu) {
            this.embed_1 = `${venceu == 1 ? `\`Vencedor:\` ${this.x}` : venceu == 3 ? `\`Empate\` entre ${this.x} e ${this.o}` : `\`Vencedor:\` ${this.o}`}`
            this.embed_2 = `${tabu(this.casas)}`;
            return 'g';
        }
    }
}

module.exports = {
    run: async(msg) => {
        const member = msg.mentions.users.first() || msg.bot.users.get(msg.args[0]);
        if (!member) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, mencione alguém para jogar.`);
        if (member.id == msg.author.id || (member.id != msg.bot.user.id && member.bot)) return;
        let main = new jogo(msg.author, member)
        msg.channel.send(`\`Jogo da velha:\` ${msg.author} contra ${member}`).then(async(message) => {
            setTimeout(async() => {
                message.delete()
                await msg.channel.send(main.embed_1).then(async(msg_1) => {
                    await msg.channel.send(main.embed_2).then(async(msg_2) => {
                        for (let i = 0; i < emojis.length; i++) { await msg_2.react(emojis[i]) }
                        let col = msg_2.createReactionCollector((r,u) => emojis.includes(r.emoji.name) && (u.id == msg.author.id || u.id == member.id || u.id == msg.bot.user.id), {time:10*60*1000});
                        col.on('collect', r => {
                            if (r.users.last().id != main.turn.id) return;
                            r.remove(main.turn) && r.remove(msg.bot.user);
                            if (member.id == msg.bot.user.id ? main.jogarBot(emojis.indexOf(r.emoji.name)) : main.jogar(emojis.indexOf(r.emoji.name)) == 'g') col.stop();
                            msg_1.edit(main.embed_1);
                            msg_2.edit(main.embed_2);
                        })
                    })
                })
            }, 2000)
        })
    },
    conf:{ aliases: ['jogodavelha','jogo-da-velha','jdv'], enable: true, cooldown: 30 },
    help: {
        name: 'ttt',
        description: 'jogue o jogo da velha com um amigo.',
        usage: ['ttt @usuário'],
        member: 'usuários',
        category: 'diversão',
        credit: ['[Acnologia](https://github.com/Acnologla)']
    }
}