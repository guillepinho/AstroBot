const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Mostra o avatar do usuário, se ninguém for selecionado, mostra o seu')
    .addUserOption((option) => option
      .setRequired(false)
      .setName('usuário-alvo')
      .setDescription('De quem você quer ver o avatar?')),
  run: async ({ interaction }) => {
    const target = interaction.options.getUser('usuário-alvo') || interaction.user;

    const embed = new EmbedBuilder()
      .setTitle(`Avatar de ${target.username}`)
      .setImage(target.displayAvatarURL({ dynamic: true, size: 4096 }));

    await interaction.reply({ embeds: [embed] });
  },
};
