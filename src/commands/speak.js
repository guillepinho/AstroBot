const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('falar')
    .setDescription('Eu falo alguma coisa pra você. _use se você tiver vergonha de falar hihi_')
    .addStringOption((option) => option
      .setRequired(true)
      .setName('texto')
      .setDescription('O que eu vou falar?')),
  run: async ({ interaction }) => {
    const text = interaction.options.getString('texto');

    interaction.reply({ content: 'Mandei, hihi', ephemeral: true });

    return interaction.channel.send(text);
  },
};
