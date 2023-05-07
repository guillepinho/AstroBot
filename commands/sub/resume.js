const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = async (interaction, queue) => {
  queue.node.resume();

  astroEmbed.setDescription('Opa! SOLTA O SHOW NA CAIXA DJ! *que no caso sou eu*');

  return interaction.editReply({ embeds: [astroEmbed] });
};
