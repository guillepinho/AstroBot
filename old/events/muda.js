const { Events, EmbedBuilder } = require('discord.js');
const { color } = require('../../utils/constants');

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.author.bot) return null;

    if (/muda muda/i.test(message.content)) {
      const muda = Math.ceil(Math.random() * 10);

      const mudamessage = new EmbedBuilder()
        .setTitle('Ouvi MUDA?')
        .setColor(color)
        .setImage('https://c.tenor.com/R5BaBITnM3UAAAAd/giorno-part5.gif')
        .setFooter({ text: 'MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA' });

      if (muda <= 4) return message.reply({ embeds: [mudamessage] });
      return null;
    }
    return null;
  },
};
