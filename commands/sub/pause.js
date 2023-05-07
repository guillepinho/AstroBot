const { EmbedBuilder } = require('@discordjs/builders');
const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = async (interaction, queue) => {
  queue.node.setPaused(true);

  const embed = new EmbedBuilder()
    .setTitle(astroEmbed.title)
    .setColor(astroEmbed.color)
    .setDescription('Música atual pausada, vou ali pegar uma água e já volto pra tocar mais!');

  return interaction.editReply({ embeds: [embed] });
};
