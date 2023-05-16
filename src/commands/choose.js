const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const { color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('escolhe')
    .setDescription('Tá indeciso? deixa que eu te ajudo, Me fala as opções e eu escolho a melhor pra você')
    .addStringOption((option) => option
      .setRequired(true)
      .setName('opções')
      .setDescription('Quais são as opções? Pode escrever quantas quiser, só separe elas por vírgulas')),
  run: async ({ interaction }) => {
    const options = interaction.options.getString('opções').split(',').map((option) => option.trim());

    if (options.length <= 1) return interaction.reply('Então, seu tonto, vou escolher entre uma só opção?');

    const result = Math.floor(Math.random() * options.length);

    const embed = new EmbedBuilder()
      .setTitle('Qual escolher, qual escolher???')
      .setColor(color)
      .setDescription(`Calma, ${interaction.user.username}! Eu te ajudo...`)
      .addFields(
        { name: 'As opções eram:', value: `[${options.join(', ')}]` },
        { name: 'Uni duni te, Salame minguê', value: `Um sorvete colorê, O escolhido foi você: __**${options[result]}**__!` },
      )
      .setFooter({ text: 'Agora vai ter que escolher esse mesmo, viu?' })
      .setImage('https://c.tenor.com/jD9MdKIIp1gAAAAM/counting-baby.gif');

    return interaction.reply({ embeds: [embed] });
  },
};
