const { EmbedBuilder } = require('@discordjs/builders');
const { color, titleDJEmbed } = require('../../utils/constants');

module.exports = async (interaction, queue) => {
  queue.node.resume();

  const embed = new EmbedBuilder()
    .setTitle(titleDJEmbed)
    .setColor(color)
    .setDescription('Opa! SOLTA O SHOW NA CAIXA DJ! *que no caso sou eu*');

  return interaction.editReply({ embeds: [embed] });
};
