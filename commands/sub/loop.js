const { QueueRepeatMode } = require('discord-player');
const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = async (interaction, queue) => {
  const type = interaction.options.getInteger('tipo');

  switch (type) {
    case QueueRepeatMode.TRACK:
      astroEmbed.setDescription('Looping da música atual ligado.');
      break;
    case QueueRepeatMode.QUEUE:
      astroEmbed.setDescription('Looping da lista inteira ligado.');
      break;
    case QueueRepeatMode.OFF:
      astroEmbed.setDescription('Looping desligado.');
      break;
    default:
      return interaction.editReply('Tipo não permitido.');
  }

  queue.setRepeatMode(type);

  return interaction.editReply({ embeds: [astroEmbed] });
};
