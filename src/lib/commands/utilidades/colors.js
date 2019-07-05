const convert          = require('color-convert');

module.exports = {
    run: async(msg) => {
        let color_font;
        let cor = msg.args[0];
        if (cor && /^#?[0-9a-f]{6}$/i.test(cor)) color_font = cor.replace('#','');
        else if (cor == '--random')              color_font = '000000'.replace(/0/g, () => (~~(Math.random()*16)).toString(16));
        else  msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, coloque uma cor para mostrar as informações dela.`);
        await msg.channel.send({
            embed:{
                color: parseInt(color_font, 16),
                thumbnail: {url: `https://dummyimage.com/250/${color_font}/&text=%20`},
                fields: [
                    {
                      name: 'HEX',
                      value: `#${color_font}`,
                      inline: true
                    },
                    {
                      name: 'RGB',
                      value: `${convert.hex.rgb(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'CMYK',
                      value: `${convert.hex.cmyk(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'HSL',
                      value: `${convert.hex.hsl(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'HSV',
                      value: `${convert.hex.hsv(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'HWB',
                      value: `${convert.hex.hwb(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'LAB',
                      value: `${convert.hex.lab(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'ANSI16',
                      value: `${convert.hex.ansi16(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'ANSI256',
                      value: `${convert.hex.ansi256(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'XYZ',
                      value: `${convert.hex.xyz(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'HCG',
                      value: `${convert.hex.hcg(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'Apple',
                      value: `${convert.hex.apple(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'Gray',
                      value: `${convert.hex.gray(color_font)}`,
                      inline: true
                    },
                    {
                      name: 'CSS',
                      value: `${convert.hex.keyword(color_font)}`,
                      inline: true
                    }
                  ],
                footer:{
                    icon_url: msg.author.displayAvatarURL,
                    text: msg.author.tag
                },
                timestamp: new Date()
            }
        })
    },
    conf:{
        aliases: ['cor','color'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: true,
        enable: true,
        hide_help: true,
        cooldown: 5,
        helper: {
            name: 'colors',
            description: 'veja as informações de uma cor',
            usage: ['colors #cor','colors --random'],
            member: 'usuários',
            category: 'utilidades'
        }
    }
}