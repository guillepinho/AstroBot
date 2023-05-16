const { EmbedBuilder } = require('@discordjs/builders');
const { color, titleDJEmbed } = require('../../utils/constants');

module.exports = async (interaction, queue) => {
  const queued = queue.history.queue.tracks.data;
  const { currentTrack } = queue;

  const embed = new EmbedBuilder()
    .setTitle(titleDJEmbed)
    .setColor(color)
    .setDescription(`Okok, entendi, não curtiu a música **${currentTrack.title}** e quer pular ela, né?`);

  queue.node.skip();

  if (!queued.length) {
    embed.setFooter({ text: 'Só tem um problema, essa era a última música da fila, então vou parar de tocar, vlwflw!' });
  }

  return interaction.editReply({ embeds: [embed] });
};
