const { QueryType, useMasterPlayer } = require('discord-player');
const { playerNodeOptions } = require('../../utils/constants');

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
    try {
      const { playlist } = result;

      await player.play(userVoiceChannel, playlist, {
        nodeOptions: {
          ...playerNodeOptions,
          metadata: interaction,
        },
      });

      return interaction.editReply(`**🎶 DJ ASTRO 🎶**: Adicionei à fila de músicas a playlist **[${playlist.title}](${playlist.url})** com ${playlist.tracks.length} músicas.`);
    } catch (error) {
      console.log(error);
      return interaction.editReply('Ocorreu um erro, tente com outra playlist');
    }
  }

  try {
    const song = result.tracks[0];
    const { track } = await player.play(userVoiceChannel, song, {
      nodeOptions: {
        ...playerNodeOptions,
        metadata: interaction,
      },
    });
    return interaction.editReply(`**🎶 DJ ASTRO 🎶**: Adicionei à fila a música **[${track.author} - ${track.title}](${track.url})**.`);
  } catch (error) {
    console.log(error);
    return interaction.editReply('Ocorreu um erro, tente com outra música');
  }
};
