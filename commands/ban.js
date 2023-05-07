const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');
const { color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Entrega o martelo do ban na cara de um sujeito salafrário')
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.BAN_MEMBERS)
    .addUserOption((option) => option
      .setRequired(true)
      .setName('alvo')
      .setDescription('Quem vai ser banido?'))
    .addStringOption((option) => option
      .setRequired(false)
      .setName('motivo')
      .setDescription('Qual o motivo do ban?')),
  run: async ({ interaction }) => {
    try {
      const target = interaction.options.getUser('alvo');
      const reason = interaction.options.getString('motivo') || 'Não precisa de motivo, só banir mesmo';

      const embed = new EmbedBuilder()
        .setTitle('LÁ VAAAAAAAAAAI O MARTELÃO!!')
        .setColor(color)
        .setDescription(`SIIIM, VOCÊ MANDOU E EU OBEDEÇO! ${target} ESTEJA BANIDO!`)
        .addFields({ name: 'E o motivo?', value: reason })
        .setFooter({ text: 'Não sejam como essa pessoa, ok?' })
        .setImage('https://c.tenor.com/QHkT9KEz0pYAAAAd/boom-hammer-smash.gif');

      await interaction.editReply({ embeds: [embed] });
      await interaction.guild.members.ban(target, { reason });
    } catch (error) {
      await interaction.editReply({ content: 'Não foi possível banir o usuário, ele é muito mais poderoso que eu... o maldito tem ki de mais de oito mil!' });
    }
  },
};
