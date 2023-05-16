const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Mostra os comandos disponíveis para administração no Astro Bot'),
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder()
      .setTitle('Astro Bot')
      .setColor(color)
      .setDescription('Comandos disponíveis para administração:')
      .addFields(
        { name: '/ban', value: 'Bane um usuário do servidor' },
        { name: '/kick', value: 'Expulsa um usuário do servidor' },
        { name: '/unban', value: 'Desbane um usuário do servidor' },
        { name: '/limpar', value: 'Remove um número informado de mensagens' },
      );

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
