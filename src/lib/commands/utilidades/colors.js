const convert = require('color-convert');
const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        let color_font;
        if (msg.args[0] && /^#?[0-9a-f]{6}$/i.test(msg.args[0])) color_font = msg.args[0].replace('#','');
        if (!msg.args[0]) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar a cor desejada em hex.`);
        await msg.channel.send(
            new RemiyaEmbed(msg.author)
            .setThumbnail(`https://dummyimage.com/250/${color_font}/&text=%20`)
            .setColor(parseInt(color_font, 16))
            .addField('HEX',     `#${color_font}`,                     true)
            .addField('RGB',     `${convert.hex.rgb(color_font)}`,     true)
            .addField('CMYK',    `${convert.hex.cmyk(color_font)}`,    true)
            .addField('HSL',     `${convert.hex.hsl(color_font)}`,     true)
            .addField('HSV',     `${convert.hex.hsv(color_font)}`,     true)
            .addField('HWB',     `${convert.hex.hwb(color_font)}`,     true)
            .addField('LAB',     `${convert.hex.lab(color_font)}`,     true)
            .addField('ANSI16',  `${convert.hex.ansi16(color_font)}`,  true)
            .addField('ANSI256', `${convert.hex.ansi256(color_font)}`, true)
            .addField('XYZ',     `${convert.hex.xyz(color_font)}`,     true)
            .addField('HCG',     `${convert.hex.hcg(color_font)}`,     true)
            .addField('Apple',   `${convert.hex.apple(color_font)}`,   true)
            .addField('Gray',    `${convert.hex.gray(color_font)}`,    true)
            .addField('CSS',     `${convert.hex.keyword(color_font)}`, true)
        )
    },
    conf:{
        aliases: ['cor','color'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 10
    },
    help: {
        name: 'colors',
        description: 'veja as informações de uma cor',
        usage: ['colors #cor','colors --random'],
        member: 'usuários',
        category: 'utilidades'
    }
}