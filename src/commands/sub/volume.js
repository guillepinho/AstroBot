module.exports = async (interaction, queue) => {
  const volume = interaction.options.getInteger('volume');

  queue.node.setVolume(volume);

  return interaction.editReply(`Shooow, vou mudar a altura do volume da caixa para **${volume}%**`);
};
