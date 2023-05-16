const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.author.bot) return null;

    if (/gosto(s[oa])?$/i.test(message.content)) return message.react('❤️');
    return null;
  },
};
