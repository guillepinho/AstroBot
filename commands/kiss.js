const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const kisses = require('../utils/kisses.json');
const { timeToReact, color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('beijo')
    .setDescription('Manda aquele beijin totoso pro amiguin _ou crush_')
    .addMentionableOption((option) => option
      .setRequired(true)
      .setName('alvo')
      .setDescription('Quem vai receber o beijo?'))
    .addStringOption((option) => option
      .setRequired(false)
      .setName('motivo')
      .setDescription('Qual o motivo do beijo?')),
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const target = interaction.options.getMentionable('alvo');
    const reason = interaction.options.getString('motivo') || 'Não precisa de motivo, só beijin molhado mesmo';

    const emoji = '💋';

    const embed = new EmbedBuilder()
      .setTitle('*SMACK!*')
      .setColor(color)
      .setDescription(`${target}, receba um beijo de ${interaction.user.username}!`)
      .addFields({ name: 'E o motivo desse abracin totoso?', value: reason })
      .setFooter({ text: 'Abraços são sempre bem vindos, não é mesmo? Clique no emoji abaixo para retribuir o coleguinha!' })
      .setImage(kisses[Math.floor(Math.random() * kisses.length)]);

    const reply = await interaction.editReply({ embeds: [embed] });
    reply.react(emoji);

    const targetReactionFilter = (reaction, user) => [emoji].includes(reaction.emoji.name) && user.id === target.id && !user.bot;

    const collector = await reply.awaitReactions({
      filter: targetReactionFilter, max: 1, time: timeToReact,
    });

    const targetReaction = collector.first();
    if (targetReaction) {
      const targetEmbed = new EmbedBuilder()
        .setTitle('EEEEETA, arrumem um quarto, meteu a língua de volta!')
        .setColor(color)
        .setDescription(`${interaction.user.username}, receba um BEIJAÇO de volta de ${target}!`)
        .addFields({ name: 'Iiiih', value: '_foi quente..._' })
        .setImage(kisses[Math.floor(Math.random() * kisses.length)]);

      await interaction.followUp({ embeds: [targetEmbed] });
    }
  },
};
