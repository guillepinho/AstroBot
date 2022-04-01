const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'abs',
    description: 'manda aquele abraço pro colega',
    async execute(message, args) {
        if (args == '') {
            message.reply('A sintaxe do comando é: _!abs "pessoinha" "razão"_.');
            return;
        }

        if (args == `<@!${message.author.id}>`) {
            message.reply('Pera... você vai se auto abraçar a si mesmo?');
            return;
        }

        else {
            message.delete();
            const alvo = args.shift();
            const mensagem = args.join(' ');
            const abs = require('../jsons/abs.json');
            const randomValue = abs[parseInt(Math.random() * abs.length)].link;
            const randomValue2 = abs[parseInt(Math.random() * abs.length)].link;
            const emoji = '🤗';
            const abraco = new MessageEmbed()
                .setColor([45, 25, 52])
                .setTitle('Hoooooora do abraaaaciiiin!')
                .setDescription(`${alvo}, receba um abraço de ${message.author.username}`)
                .setImage(randomValue)
                .addFields({
                    name: 'E o motivo desse abracin totoso?', value: mensagem != '' ? mensagem : 'Não precisa de motivo, só abracin totoso mesmo.'
                });

            const abracoVolta = new MessageEmbed()
                .setColor([45, 25, 52])
                .setTitle('Eeeee ele abraça de voltaaaaa!')
                .setDescription(`${message.author.username}, receba um abraço de volta de ${alvo}`)
                .setImage(randomValue2);

            message.channel.send({ embeds: [abraco] })
                .then((msg) => {
                    msg.react(emoji);

                    const filter = (reaction, user) => {
                        return reaction.emoji.name === '🤗' &&
                            user.id === alvo.replace(/!|<|@|>/g, '') &&
                            !user.bot;
                    };

                    const coletor = msg.createReactionCollector({
                        filter,
                        max: 1,
                        time: 1000 * 15,
                    });

                    coletor.on('collect', () => {
                        message.channel.send({ embeds: [abracoVolta] });
                    });
                });
        }
    }
};