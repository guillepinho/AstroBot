const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = async (interaction, queue) => {
  const queued = queue.history.queue.tracks.data;
  const { currentTrack } = queue;

  queue.node.skip();

  astroEmbed.setDescription(`Okok, entendi, não curtiu a música **${currentTrack.title}** e quer pular ela, né?`);

  if (!queued.length) {
    astroEmbed.setFooter({ text: 'Só tem um problema, essa era a última música da fila, então vou parar de tocar, vlwflw!' });
  }

  return interaction.editReply({ embeds: [astroEmbed] });
};
