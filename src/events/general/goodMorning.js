const { Events } = require('discord.js');
const goodMorning = require('../../utils/goodMorning.json');

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.author.bot) return null;

    if (/bom dia/i.test(message.content)) {
      const goodMorningMessages = Object.values(goodMorning);
      const randomValue = Math.floor(Math.random() * goodMorningMessages.length) + 1;

      return message.reply(goodMorning[randomValue]);
    }
    return null;
  },
};
