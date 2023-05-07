const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = async (interaction, queue) => {
  queue.setRepeatMode(0);
  queue.delete();

  astroEmbed.setDescription('Entendido, lista de reprodução parada e limpa!');

  return interaction.editReply({ embeds: [astroEmbed] });
};
