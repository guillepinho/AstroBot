const { EmbedBuilder } = require('@discordjs/builders');
const { color, titleDJEmbed } = require('../../utils/constants');

module.exports = async (interaction, queue) => {
  queue.setRepeatMode(0);
  queue.delete();

  const embed = new EmbedBuilder()
    .setTitle(titleDJEmbed)
    .setColor(color)
    .setDescription('Entendido, lista de reprodução parada e limpa!');

  return interaction.editReply({ embeds: [embed] });
};
