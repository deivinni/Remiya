const { RichEmbed } = require('discord.js');
const { colors } = require('../config');

module.exports = class RemiyaEmbed extends RichEmbed{
    constructor(user, data = {}) {
        super(data)
        this.setColor(colors.PADRÃO)
        if (user) this.setFooter(user.tag, user.displayAvatarURL).setTimestamp()
    }
    setDescriptionArray (messages) {
        this.description = messages.map(lines => lines.filter(x => !!x).join('\n')).filter(x => !!x.length).join('\n\n')
        return this;
    }
    addFieldArray (name, value, inline = false) {
        value = value.map(lines => lines.filter(x => !!x).join('\n')).filter(x => !!x.length).join('\n\n')
        this.fields.push({ name, value, inline })
        return this;
    }
    setTitleURL(title, url) {
        this.title = title;
        this.url = url;
        return this;
    }
}