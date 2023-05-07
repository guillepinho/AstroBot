const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = async (interaction, queue) => {
  queue.node.setPaused(true);

  astroEmbed.setDescription('Música atual pausada, vou ali pegar uma água e já volto pra tocar mais!');

  return interaction.editReply({ embeds: [astroEmbed] });
};
