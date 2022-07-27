const { MessageEmbed } = require('discord.js');
const bj = require('../jsons/bj.json');

module.exports = {
  name: 'bj',
  description: 'manda aquele abraço pro colega',
  async execute(message, args) {
    const { author } = message;

    if (args.length === 0) {
      message.reply('A sintaxe do comando é: _!bj "pessoinha" "razão"_.');
      return;
    }

    if (args[0] === `<@${author.id}>`) {
      message.reply('Pera... você vai se auto beijar a si mesmo?');
      return;
    }

    else {
      message.delete();
      const alvo = args.shift();
      const mensagem = args.join(' ');
      const imgBj = bj[parseInt(Math.random() * bj.length)].link;
      const imgBj2 = bj[parseInt(Math.random() * bj.length)].link;
      const emoji = '💋';

      const bejo = new MessageEmbed()
        .setColor([45, 25, 52])
        .setTitle('*SMACK!*')
        .setDescription(`${alvo}, receba um beijo de ${author.username}`)
        .setImage(imgBj)
        .addFields({
          name: 'E pusque do beijin molhado?', value: mensagem != '' ? mensagem : 'Não precisa de motivo, só o lambes lambes.'
        });

      const bejoVolta = new MessageEmbed()
        .setColor([45, 25, 52])
        .setTitle('EEEEETA, arrumem um quarto, meteu a língua de volta!')
        .setDescription(`${author.username}, receba um BEIJAÇO de volta de ${alvo}`)
        .setImage(imgBj2)
        .addFields({
          name: 'Iiiih', value: 'ARRUMA UM QUARTO!'
        });;


      try {
        const firstMsg = await message.channel.send({ embeds: [bejo] });
        await firstMsg.react(emoji);

        const filter = (reaction, user) => {
          return reaction.emoji.name === '💋' &&
            user.id === alvo.replace(/!|<|@|>/g, '') &&
            !user.bot;
        };

        const coletor = firstMsg.createReactionCollector({
          filter,
          max: 1,
          time: 1000 * 15,
        });

        coletor.on('collect', () => {
          message.channel.send({ embeds: [bejoVolta] });
        });
      }
      catch (error) {
        message.reply(error);
      }    
    }
  }
};