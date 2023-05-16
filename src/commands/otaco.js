const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const otako = require('../utils/otako.json');
const { color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('otaco')
    .setDescription('otaco troxa'),
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder()
      .setColor(color)
      .setImage(otako[Math.floor(Math.random() * otako.length)]);

    return interaction.reply({ embeds: [embed] });
  },
};
