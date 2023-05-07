const { EmbedBuilder } = require('@discordjs/builders');
const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = async (interaction, queue) => {
  queue.setRepeatMode(0);
  queue.delete();

  const embed = new EmbedBuilder()
    .setTitle(astroEmbed.title)
    .setColor(astroEmbed.color)
    .setDescription('Entendido, lista de reprodução parada e limpa!');

  return interaction.editReply({ embeds: [embed] });
};
