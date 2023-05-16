const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dado')
    .setDescription('Rola um dado')
    .addIntegerOption((option) => option
      .setRequired(true)
      .setName('dados')
      .setDescription('Quantos dados vamos rolar?')
      .setMinValue(1)
      .setMaxValue(9))
    .addIntegerOption((option) => option
      .setRequired(true)
      .setName('lados')
      .setDescription('Quantos lados tem o dado?')
      .setChoices(
        { name: '4', value: 4 },
        { name: '6', value: 6 },
        { name: '8', value: 8 },
        { name: '10', value: 10 },
        { name: '12', value: 12 },
        { name: '20', value: 20 },
        { name: '100', value: 100 },
      ))
    .addIntegerOption((option) => option
      .setRequired(false)
      .setName('modificador')
      .setDescription('Qual o modificador?')
      .setMinValue(-100)
      .setMaxValue(100))
    .addBooleanOption((option) => option
      .setRequired(false)
      .setName('segredo')
      .setDescription('Roll secreto?')),
  run: async ({ interaction }) => {
    const dices = interaction.options.getInteger('dados');
    const sides = interaction.options.getInteger('lados');
    const modifier = interaction.options.getInteger('modificador') || 0;
    const dm = interaction.options.getBoolean('segredo') || false;

    if (dm) await interaction.deferReply({ ephemeral: true });
    else await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setTitle(`Dado de ${interaction.user.username}`)
      .setColor(color)
      .setDescription(`Gerando um roll de ${dices}d${sides}, com modificador ${modifier}`);

    let diceResult = 0;
    const diceResultArray = [];

    const gifs = [];

    for (let i = 0; i < dices; i += 1) {
      const currentRoll = Math.floor(Math.random() * sides) + 1;
      diceResult += currentRoll;
      gifs.push(new AttachmentBuilder()
        .setFile(`./assets/gifs/d${sides}_${currentRoll}.gif`)
        .setName(`d${sides}_${currentRoll}.gif`)
        .setDescription(`Resultado: ${currentRoll}`));
      diceResultArray.push(currentRoll);
    }

    const dicesResults = diceResultArray.join(', ');

    embed.addFields(
      { name: '__Resultado Final__:', value: `${diceResult + modifier}` },
      { name: 'Resultados:', value: `[${dicesResults}]`, inline: true },
      { name: 'Soma dos dados:', value: `${diceResult}`, inline: true },
      { name: 'Modificador:', value: `${modifier}`, inline: true },
    );

    if (dm) return interaction.followUp({ embeds: [embed], files: gifs });

    return interaction.followUp({ embeds: [embed], files: gifs });
  },
};
