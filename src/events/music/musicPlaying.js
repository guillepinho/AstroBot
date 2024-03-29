const { useMasterPlayer } = require('discord-player');
const { EmbedBuilder } = require('@discordjs/builders');
const { color, titleDJEmbed } = require('../../utils/constants');

module.exports = () => {
  const player = useMasterPlayer();

  player.events.on('playerStart', (queue, track) => {
    const embed = new EmbedBuilder()
      .setTitle(titleDJEmbed)
      .setColor(color)
      .setDescription(`Tocando agora:\n\nArtista: **${track.author}**\nMúsica: **[${track.title}](${track.url})**\nDuração: ${track.duration}`)
      .setThumbnail(track.thumbnail)
      .setFooter({ text: `Adicionado por: ${track.requestedBy.username}` });
    queue.metadata.channel.send({ embeds: [embed] });
  });
};
