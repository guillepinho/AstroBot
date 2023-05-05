const { Events } = require('discord.js');
const badWords = require('../../utils/badWords.json');

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.author.bot) return null;

    const badWordsList = Object.values(badWords);
  },
};
