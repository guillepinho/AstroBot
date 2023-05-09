const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!'),
  run: async ({ client, interaction }) => {
    const embed = new EmbedBuilder()
      .setTitle('Pong!')
      .setDescription(`🏓 POOOOONG! O tempo de resposta foi **${Date.now() - interaction.createdTimestamp} ms**. Já a latência do API foi **${Math.round(client.ws.ping)}** ms.`);

    return interaction.reply({ embeds: [embed] });
  },
};
