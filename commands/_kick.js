const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');
const { color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Chute na bunda de desavisado')
    .setDefaultMemberPermissions(PermissionFlagsBits.KICK_MEMBERS)
    .addUserOption((option) => option
      .setRequired(true)
      .setName('alvo')
      .setDescription('Quem vai ser chutado?'))
    .addStringOption((option) => option
      .setRequired(false)
      .setName('motivo')
      .setDescription('Qual o motivo do chute?')),
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const target = interaction.options.getUser('alvo');
    const reason = interaction.options.getString('motivo') || 'Não precisa de motivo, só chutar mesmo';

    await interaction.guild.members.kick(target, { reason });

    const embed = new EmbedBuilder()
      .setTitle('CHUTÃO NA BUNDA!')
      .setColor(color)
      .setDescription(`SIIIM, VOCÊ MANDOU E EU OBEDEÇO! ${target} ESTEJA CHUTADO!`)
      .addFields({ name: 'E o motivo?', value: reason })
      .setFooter({ text: 'Não sejam como essa pessoa, ok?' })
      .setImage('https://cdn.ome.lt/daLmQSa6aCQMjlozhN3XZSwv9H4=/770x0/smart/uploads/conteudo/fotos/Ryu_Tatsu.gif');

    await interaction.editReply({ embeds: [embed] });
  },
};
