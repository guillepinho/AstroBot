const { EmbedBuilder } = require('@discordjs/builders');
const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = async (interaction, queue) => {
  queue.node.resume();

  const embed = new EmbedBuilder()
    .setTitle(astroEmbed.title)
    .setColor(astroEmbed.color)
    .setDescription('Opa! SOLTA O SHOW NA CAIXA DJ! *que no caso sou eu*');

  return interaction.editReply({ embeds: [embed] });
};
