const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = async (interaction, queue) => {
  const tracks = queue.tracks.toArray();
  const nextTenTracks = tracks.slice(0, 10);
  const { currentTrack } = queue;

  nextTenTracks.map((track, index) => (`${index + 1}. ${track.author} - **${track.title}**`));

  astroEmbed
    .setDescription(`__Tocando agora__: ${currentTrack.author} - **${currentTrack.title}**`);

  nextTenTracks.forEach((track, index) => {
    astroEmbed.addFields({ name: '-', value: `${index + 1}. ${track.author} - **${track.title}**` });
  });

  return interaction.editReply({ embeds: [astroEmbed] });
};
