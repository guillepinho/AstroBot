const { Events } = require('discord.js');
const rightAstro = require('../../utils/rightAstro.json');

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.author.bot) return null;

    if (/(n[ée]? astro)/i.test(message.content)) {
      const randomValue = Math.floor(Math.random() * rightAstro.length) + 1;
      return message.reply(rightAstro[randomValue]);
    }
    return null;
  },
};
