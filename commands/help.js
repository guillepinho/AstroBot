const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ajuda')
    .setDescription('Mostra os comandos disponíveis para usuários no Astro Bot'),
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder()
      .setTitle('Astro Bot')
      .setColor(color)
      .setDescription('Comandos disponíveis:')
      .addFields(
        { name: '/abraço', value: 'Manda aquele abraço porreta pro amiguin' },
        { name: '/avatar', value: 'Mostra o avatar do usuário, se ninguém for selecionado, mostra o seu' },
        { name: '/beijar', value: 'Manda aquele beijin totoso pro amiguin _ou crush_' },
        { name: '/dj', value: 'Meu tocador de músicas! Use "/dj ajuda" para ver os comandos.' },
        { name: '/escolhe', value: 'Escolho uma opção aleatória dentre as que você me informar' },
        { name: '/falar', value: 'Falo alguma coisa no chat que você quiser' },
        { name: '/ajuda', value: 'Mostra os meus comandos disponíveis do bot.' },
        { name: '/sobre', value: 'Mostra informações sobre mim' },
        { name: '/ping', value: 'Para verificar se estou funcionando normalmente.' },
        { name: '/otaco', value: 'Manda o gif pro otaku troxa' },
        { name: '/roll', value: 'Rola um dado para o chat ou apenas para você.' },
      );

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
