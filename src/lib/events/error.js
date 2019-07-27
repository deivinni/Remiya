module.exports = (bot, error) => {
  bot.guilds.get('586610890288136202').channels.get('588804651328208907').send('```js\n'+error.stack+'```');
}