const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Remove um número informado de mensagens')
    .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_MESSAGES)
    .addIntegerOption((option) => option
      .setName('quantidade')
      .setDescription('A quantidade de mensagens a serem removidas')
      .setRequired(true)
      .setMaxValue(100)
      .setMinValue(1))
    .addChannelOption((option) => option
      .setName('canal')
      .addChannelTypes(0)
      .setDescription('O canal onde as mensagens serão removidas')
      .setRequired(false)),
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const quantity = interaction.options.getInteger('quantidade');
    const channel = interaction.options.getChannel('canal') || interaction.channel;

    const messages = await channel.messages.fetch({ limit: quantity + 1 });

    await channel.bulkDelete(messages);

    const answer = await interaction.channel.send({ content: `_Removidas **${quantity}** mensagens do canal #**${channel.name}**. Essa mensagem também se autodestruira em 5 segundos!_` });

    setTimeout(() => answer.delete(), 5000);
  },
};
