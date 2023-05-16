const { Events } = require('discord.js');
const badWords = require('../../utils/badWords.json');

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.author.bot) return null;

    const badWordsList = Object.values(badWords);
    const doesItMatch = badWordsList.filter((e) => message.content.toLowerCase().includes(e));

    if (!doesItMatch.length) return null;

    const random = Math.floor(Math.random() * 10);

    if (random >= 4) return null;
    return message.reply(`Ôoooo ${message.author.username}, é com essa boca podre que cê beija seus peguete? <:su_todezoi:684780888261001324>`);
  },
};
