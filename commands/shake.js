const { MessageEmbed } = require('discord.js');
const shake = require('../jsons/shake.json');
const TIME_REACT = 15* 1000;

module.exports = {
  name: 'shake',
  description: 'apertão de mão heterotop',
  async execute(message, args) {
    const { author } = message;

    if (args.length === 0) {
      message.reply('A sintaxe do comando é: _!shake "pessoinha" "razão"_.');
      return;
    }

    if (args[0] === `<@${author.id}>`) {
      message.reply('Pera... você vai apertar as próprias mãos? a si mesmo?');
      return;
    }

    message.delete();
    const alvo = args.shift();
    const mensagem = args.join(' ');
    const imgShk = shake[parseInt(Math.random() * shake.length)].link;
    const imgShk2 = shake[parseInt(Math.random() * shake.length)].link;
    const emoji = '🤝';

    const shk = new MessageEmbed()
      .setColor([45, 25, 52])
      .setTitle('Ei, chega aqui.')
      .setDescription(`${alvo}, receba um aperto de mão firmeza de ${author.username}`)
      .setImage(imgShk)
      .addFields({
        name: 'E o motivo?', value: mensagem !== '' ? mensagem : 'Não precisa de motivo. RESPECT.'
      });

    const shkVolta = new MessageEmbed()
      .setColor([45, 25, 52])
      .setTitle('Aperta de volta!')
      .setDescription(`${author.username}, receba um aperto firme de ${alvo}`)
      .setImage(imgShk2)
      .addFields({
        name: 'Oolha', value: 'RESPECT BACK!'
      });

    try {
      const firstMsg = await message.channel.send({ embeds: [shk] });
      await firstMsg.react(emoji);

      const filter = (reaction, user) => {
        return reaction.emoji.name === '🤝' &&
          user.id === alvo.replace(/!|<|@|>/g, '') &&
          !user.bot;
      };

      const coletor = await firstMsg.createReactionCollector({
        filter,
        max: 1,
        time: TIME_REACT,
      });

      await coletor.on('collect', () => {
        message.channel.send({ embeds: [shkVolta] });
      });
    }
    catch (error) {
      message.reply(error.message);
    }
  }
};