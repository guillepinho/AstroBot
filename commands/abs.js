const { MessageEmbed } = require('discord.js');
const abs = require('../jsons/abs.json');

module.exports = {
  name: 'abs',
  description: 'manda aquele abraço pro colega',
  async execute(message, args) {
    const { author } = message;

    if (args.length === 0) {
      message.reply('A sintaxe do comando é: _!abs "pessoinha" "razão"_.');
      return;
    }

    if (args[0] === `<@${author.id}>`) {
      message.reply('Pera... você vai se auto abraçar a si mesmo?');
      return;
    }

    else {
      message.delete();
      const alvo = args.shift();
      const mensagem = args.join(' ');
      const imgAbr = abs[parseInt(Math.random() * abs.length)].link;
      const imgAbr2 = abs[parseInt(Math.random() * abs.length)].link;
      const emoji = '🤗';

      const abraco = new MessageEmbed()
        .setColor([45, 25, 52])
        .setTitle('Hoooooora do abraaaaciiiin!')
        .setDescription(`${alvo}, receba um abraço de ${author.username}`)
        .setImage(imgAbr)
        .addFields({
          name: 'E o motivo desse abracin totoso?', value: mensagem !== '' ? mensagem : 'Não precisa de motivo, só abracin totoso mesmo.'
        });

      const abracoVolta = new MessageEmbed()
        .setColor([45, 25, 52])
        .setTitle('Eeeee ele abraça de voltaaaaa!')
        .setDescription(`${author.username}, receba um abraço de volta de ${alvo}`)
        .setImage(imgAbr2)
        .addFields({
          name: 'Ooown', value: 'Fofo, né?'
        });

      try {
        const firstMsg = await message.channel.send({ embeds: [abraco] });
        await firstMsg.react(emoji);

        const filter = (reaction, user) => {
          return reaction.emoji.name === '🤗' &&
            user.id === alvo.replace(/!|<|@|>/g, '') &&
            !user.bot;
        };

        const coletor = await firstMsg.createReactionCollector({
          filter,
          max: 1,
          time: 1000 * 15,
        });

        await coletor.on('collect', () => {
          message.channel.send({ embeds: [abracoVolta] });
        });
      }
      catch (error) {
        message.reply(error);
      }
    }
  }
};