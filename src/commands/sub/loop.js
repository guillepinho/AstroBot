const { QueueRepeatMode } = require('discord-player');
const { EmbedBuilder } = require('@discordjs/builders');
const { color, titleDJEmbed } = require('../../utils/constants');

module.exports = async (interaction, queue) => {
  const type = interaction.options.getInteger('tipo');

  const embed = new EmbedBuilder()
    .setTitle(titleDJEmbed)
    .setColor(color);

  switch (type) {
    case QueueRepeatMode.TRACK:
      embed.setDescription('Looping da música atual ligado.');
      break;
    case QueueRepeatMode.QUEUE:
      embed.setDescription('Looping da lista inteira ligado.');
      break;
    case QueueRepeatMode.OFF:
      embed.setDescription('Looping desligado.');
      break;
    default:
      return interaction.editReply('Tipo não permitido.');
  }

  queue.setRepeatMode(type);

  return interaction.editReply({ embeds: [embed] });
};
