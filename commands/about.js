const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const { color } = require('../utils/constants');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sobre')
    .setDescription('Mostra informações sobre mim'),
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder()
      .setTitle('Oi, eu sou o Astro!')
      .setColor(color)
      .setDescription('Conheça um pouco mais sobre mim:')
      .setThumbnail('https://cdnb.artstation.com/p/assets/images/images/020/239/873/original/ash-lamb-astronaut-gif-artstation-2.gif')
      .addFields(
        { name: 'Meu criador', value: 'Fui inicialmente idealizado pelo Prodd, mas desde março/2022 quem me mantém e me atualiza é o Guille' },
        { name: 'Minha função', value: 'Eu fui criado principalmente para entreter, mas também posso ser útil em várias outras coisas, como ajudar a coordenação à manter vocês em ordem' },
        { name: 'Data de Nascimento', value: '01/03/2021' },
        { name: 'Meus comandos', value: 'Você pode ver todos os meus comandos com `/ajuda`' },
        { name: 'Meu código', value: 'Curioso você, hein? Querendo saber o que tem por debaixo dessas roupas estilosas? :eyes: RS. Sou feito em javascript, com discord.js v14' },
      )
      .setFooter({ text: 'Alguém já lhe disse hoje que você é uma pessoa maravilhosa?' });

    return interaction.reply({ embeds: [embed] });
  },
};
