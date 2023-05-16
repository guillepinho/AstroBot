const { Events, EmbedBuilder } = require('discord.js');
const { color } = require('../../utils/constants');

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.author.bot) return null;

    if (/su/i.test(message.content) && /lenzi/i.test(message.content)) {
      const chances = Math.ceil(Math.random() * 10);

      const sulenzi = new EmbedBuilder()
        .setTitle('SU & LENZI?')
        .setColor(color)
        .setDescription('<:lovesu:956897671761780746><:lovexuxu:956897693542789140>')
        .setImage('https://c.tenor.com/St8FpL2GUAUAAAAC/patrick-star-cute.gif')
        .setFooter({ text: 'Que cê tá falando do casal mar fofo do survidor? aaah gut gut' });

      if (chances <= 2) {
        message.react('❤️');
        return message.reply({ embeds: [sulenzi] });
      }
      return null;
    }

    return null;
  },
};
