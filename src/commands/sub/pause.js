const { EmbedBuilder } = require('@discordjs/builders');
const { color, titleDJEmbed } = require('../../utils/constants');

module.exports = async (interaction, queue) => {
  queue.node.setPaused(true);

  const embed = new EmbedBuilder()
    .setTitle(titleDJEmbed)
    .setColor(color)
    .setDescription('Música atual pausada, vou ali pegar uma água e já volto pra tocar mais!');

  return interaction.editReply({ embeds: [embed] });
};
