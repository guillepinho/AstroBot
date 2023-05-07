const { EmbedBuilder } = require('@discordjs/builders');
const { color, titleDJEmbed } = require('../../utils/constants');

module.exports = async (interaction, queue) => {
  const tracks = queue.tracks.toArray();
  const nextTenTracks = tracks.slice(0, 10);
  const { currentTrack } = queue;

  const embed = new EmbedBuilder()
    .setTitle(titleDJEmbed)
    .setColor(color)
    .setDescription(`__Tocando agora__: ${currentTrack.author} - **${currentTrack.title}**`);

  nextTenTracks.map((track, index) => (`${index + 1}. ${track.author} - **${track.title}**`));

  nextTenTracks.forEach((track, index) => {
    embed.addFields({ name: '-', value: `${index + 1}. ${track.author} - **${track.title}**` });
  });

  return interaction.editReply({ embeds: [embed] });
};
