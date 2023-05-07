const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const hugs = require('../utils/hugs.json');
const { timeToReact, color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('abraço')
    .setDescription('Manda aquele abraço porreta pro amiguin')
    .addMentionableOption((option) => option
      .setRequired(true)
      .setName('alvo')
      .setDescription('Quem vai receber o abraço?'))
    .addStringOption((option) => option
      .setRequired(false)
      .setName('motivo')
      .setDescription('Qual o motivo do abraço?')),
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const target = interaction.options.getMentionable('alvo');
    const reason = interaction.options.getString('motivo') || 'Não precisa de motivo, só abracin totoso mesmo';

    const emoji = '🤗';

    const embed = new EmbedBuilder()
      .setTitle('Hoooooora do abraaaaciiiin!')
      .setColor(color)
      .setDescription(`${target}, receba um abraço de ${interaction.user.username}!`)
      .addFields({ name: 'E o motivo desse abracin totoso?', value: reason })
      .setFooter({ text: 'Abraços são sempre bem vindos, não é mesmo? Clique no emoji abaixo para retribuir o coleguinha!' })
      .setImage(hugs[Math.floor(Math.random() * hugs.length)]);

    const reply = await interaction.editReply({ embeds: [embed] });
    reply.react(emoji);

    const targetReactionFilter = (reaction, user) => ['🤗'].includes(reaction.emoji.name) && user.id === target.id && !user.bot;

    const collector = await reply.awaitReactions({
      filter: targetReactionFilter, max: 1, time: timeToReact,
    });

    const targetReaction = collector.first();
    if (targetReaction) {
      const targetEmbed = new EmbedBuilder()
        .setTitle('Eeeee ele abraça de voltaaaaa!')
        .setColor(color)
        .setDescription(`${interaction.user.username}, receba um abraço de volta de ${target}!`)
        .addFields({ name: 'Ooown', value: 'Fofo, né?' })
        .setImage(hugs[Math.floor(Math.random() * hugs.length)]);

      await interaction.followUp({ embeds: [targetEmbed] });
    }
  },
};
