const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bj',
    description: 'manda aquele abraço pro colega',
    async execute(message, args) {
        if (args == '') {
            message.reply('A sintaxe do comando é: _!bj "pessoinha" "razão"_.');
            return;
        }

        if (args == `<@!${message.author.id}>`) {
            message.reply('Pera... você vai se auto beijar a si mesmo?');
            return;
        }

        else {
            message.delete();
            const alvo = args.shift();
            const mensagem = args.join(' ');
            const bj = require('../jsons/bj.json');
            const randomValue = bj[parseInt(Math.random() * bj.length)].link;
            const randomValue2 = bj[parseInt(Math.random() * bj.length)].link;
            const emoji = '💋';
            const bejo = new MessageEmbed()
                .setColor([45, 25, 52])
                .setTitle('*SMACK!*')
                .setDescription(`${alvo}, receba um beijo de ${message.author.username}`)
                .setImage(randomValue)
                .addFields({
                    name: 'E pusque do beijin molhado?', value: mensagem != '' ? mensagem : 'Não precisa de motivo, só o lambes lambes.'
                });

            const bejoVolta = new MessageEmbed()
                .setColor([45, 25, 52])
                .setTitle('EEEEETA, arrumem um quarto, meteu a língua de volta!')
                .setDescription(`${message.author.username}, receba um BEIJAÇO de volta de ${alvo}`)
                .setImage(randomValue2);

            message.channel.send({ embeds: [bejo] })
                .then((msg) => {
                    msg.react(emoji);

                    const filter = (reaction, user) => {
                        return reaction.emoji.name === '💋' &&
                            user.id === alvo.replace(/!|<|@|>/g, '') &&
                            !user.bot;
                    };

                    const coletor = msg.createReactionCollector({
                        filter,
                        max: 1,
                        time: 1000 * 15,
                    });

                    coletor.on('collect', () => {
                        message.channel.send({ embeds: [bejoVolta] });
                    });
                });
        }
    }
};