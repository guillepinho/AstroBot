const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');
const { color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Desfaz o banimento de um usuário')
    .setDefaultMemberPermissions(PermissionFlagsBits.BAN_MEMBERS)
    .addUserOption((option) => option
      .setRequired(true)
      .setName('alvo')
      .setDescription('Quem vai ser desbanido?')),
  run: async ({ interaction }) => {
    await interaction.deferReply();
    const target = interaction.options.getUser('alvo');
    const unbanlist = await interaction.guild.bans.fetch();
    const banned = unbanlist.get(target.id);

    if (!banned) {
      return interaction.editReply({ content: 'Este usuário não está banido!' });
    }

    await interaction.guild.members.unban(target);

    const embed = new EmbedBuilder()
      .setTitle('Estamos voltando no tempo!')
      .setColor(color)
      .setDescription('Doutor Estranho, chega aí! Precisamos corrigir uns erros do passado, vamos consrtar a linha do tempo!')
      .addFields({ name: '\u200b', value: `O membro ${target} foi desbanido!` });

    return interaction.editReply({ embeds: [embed] });
  },
};
