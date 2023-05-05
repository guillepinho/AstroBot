const { Events } = require('discord.js');
const rightAstro = require('../../utils/rightAstro.json');

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.author.bot) return null;

    if (/(?![nN]é? astro)ne astro/i.test(message.content)) {
      const rightAstroMessages = Object.values(rightAstro);
      const randomValue = Math.floor(Math.random() * rightAstroMessages.length) + 1;
      return message.reply(rightAstro[randomValue]);
    }
    return null;
  },
};
