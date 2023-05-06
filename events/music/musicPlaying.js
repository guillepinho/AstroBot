const { useMasterPlayer } = require('discord-player');
const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = () => {
  const player = useMasterPlayer();

  player.events.on('playerStart', (queue, track) => {
    astroEmbed
      .setDescription(`Tocando agora:\n\nArtista: **${track.author}**\nMúsica: **[${track.title}](${track.url})**\nDuração: ${track.duration}`)
      .setThumbnail(track.thumbnail)
      .setFooter({ text: `Adicionado por: ${track.requestedBy.username}` });
    queue.metadata.channel.send({ embeds: [astroEmbed] });
  });
};
