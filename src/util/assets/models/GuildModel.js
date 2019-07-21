module.exports = {
    _id: String,
    lang: { type: String, default: 'pt-BR' },
    prefix: { type: String, default: process.env.PREFIX },
    mute_role: { type: String, default: '0' },
    logs: { type: Boolean, default: false },
    log_channel: { type: String, default: '0' },
    level: { type: Boolean, default: true },
    lev_channel: { type: String, default: '0' },
    commands: { type: Boolean, default: false },
    cmd_channel: { type: String, default: '0' },
    welcome: { type: Boolean, default: false },
    wel_channel: { type: String, default: '0' },
    anti_invite: { type: Boolean, default: false },
    inv_channel: { type: String, default: '0' }
}