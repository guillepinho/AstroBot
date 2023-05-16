const { QueryType, useMasterPlayer } = require('discord-player');

module.exports = async (interaction, userVoiceChannel) => {
  const player = useMasterPlayer();

  const isPlaylist = interaction.options.getString('tipo');
  const url = interaction.options.getString('url');

  const result = await player.search(url, {
    requestedBy: interaction.user,
    searchEngine: QueryType.AUTO,
  });

  if (!result.tracks.length) return interaction.editReply('Nenhum resultado encontrado.');

  if (isPlaylist === 'playlist') {
    const { playlist } = result;

    await player.play(userVoiceChannel, playlist, {
      nodeOptions: {
        metadata: interaction,
      },
    });

    return interaction.editReply(`**🎶 DJ ASTRO 🎶**: Adicionei à fila de músicas a playlist **[${playlist.title}](${playlist.url})** com ${playlist.tracks.length} músicas.`);
  }

  const song = result.tracks[0];
  const { track } = await player.play(userVoiceChannel, song, {
    nodeOptions: {
      metadata: interaction,
    },
  });
  return interaction.editReply(`**🎶 DJ ASTRO 🎶**: Adicionei à fila a música **[${track.author} - ${track.title}](${track.url})**.`);
};
