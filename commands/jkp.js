module.exports = {
    name: 'jkp',
    description: 'jokenpo',
    async execute(message, args) {
        if (args[0] === '' || !args[0] || !args[0].startsWith('<@')) {
            message.reply('Acho que o sinhô esqueceu de marcar com quem você ia jogar antes.');
            return;
        }

        const alvo = message.mentions.members.first().id;
        const desafiador = message.author.id;
        let jogadaAuthor = '';
        let jogadaAlvo = '';

        // if (alvo === '954183613900005386') {
        //     message.reply('Desculpaê, mas eu nem tô afim de jogar... procura otô.');
        //     return;
        // }

        if (alvo === desafiador) {
            message.reply('... ocê, contra você mesmo?');
            message.channel.send('https://c.tenor.com/-P-xeHYEY9QAAAAd/sad-pablo-lonely.gif');
            return;
        }

        message.delete();

        message.channel.send(`Turu bon, <@!${alvo}>? <@!${desafiador}> te desafiou para um jokenpô, topas? Mandei uma mensagem no seu DM, só reagir a mensagem para registrar qual a sua jogada por lá. Se não quiser jogar também, só ignorar.`);

        try {
            const authorMsg = await message.author.send(`Qual vai ser a sua jogada, <@!${desafiador}>?`);
            authorMsg.react('👊');
            authorMsg.react('✌️');
            authorMsg.react('✋');

            const filter = (reaction, user) => {
                return user.id === desafiador && ['👊', '✌️', '✋'].includes(reaction.emoji.name);
            };

            const coletor = authorMsg.createReactionCollector({
                filter,
                max: 1,
                time: 1000 * 10,
            });

            coletor.on('collect', async (reaction, user) => {
                const authorCollect = await message.channel.send(`Coletada a jogada de ${user.username}.`);
                setTimeout(() => { authorCollect.delete() }, 4000)
                jogadaAuthor = `${reaction.emoji.name}`;
                coletor.stop();
            });

            coletor.on('end', (collected) => {
                if (collected.size === 0) {
                    message.channel.send(`<@!${desafiador}> não me passou qual ia ser sua jogada hein... 🐔`);
                    return;
                }
            });
        }
        catch (e) {
            message.channel.send(`author error: ${e.message}`);
            return;
            // message.channel.send(`A DM de <@!${desafiador}> está fechada para mim... Assim não conseguiremos jogar.`);
        }

        try {
            const alvoMsg = await message.mentions.members.first().send(`Qual vai ser a sua jogada, <@!${alvo}>?`);
            alvoMsg.react('👊');
            alvoMsg.react('✌️');
            alvoMsg.react('✋');

            const filter = (reaction, user) => {
                return user.id === alvo && ['👊', '✌️', '✋'].includes(reaction.emoji.name);
            };

            const coletor = alvoMsg.createReactionCollector({
                filter,
                max: 1,
                time: 1000 * 10,
            });

            coletor.on('collect', async (reaction, user) => {
                const alvoCollect = await message.channel.send(`Coletada a jogada de ${user.username}.`);
                setTimeout(() => { alvoCollect.delete() }, 4000);
                jogadaAlvo = `${reaction.emoji.name}`;
                coletor.stop();
            });

            coletor.on('end', (collected) => {
                if (collected.size === 0) {
                    message.channel.send(`<@!${alvo}> não me passou qual ia ser a sua jogada hein... 🐔`);
                    return;
                }
            });
        }
        catch (e) {
            message.channel.send(`alvo error: ${e.message}`);
            return;
            // message.channel.send(`A DM de <@!${alvo}> está fechada para mim... Assim não conseguiremos jogar.`);
        }

        setTimeout(async () => {
            if (jogadaAlvo === '' || jogadaAuthor === '') {
                message.channel.send('Como teve gente que não jogou, encerrei o jogo. Se quiserem, só tentar de novo, tá? abraçu.');
                return;
            }
            const start = await message.channel.send('https://c.tenor.com/7HFPLm7Rl8oAAAAC/321-count-down.gif');

            setTimeout(async () => {
                start.delete();
                if (jogadaAuthor === '👊' && jogadaAlvo === '✌️') {
                    message.channel.send(`<@!${desafiador}> jogou ${jogadaAuthor} e <@!${alvo}> jogou ${jogadaAlvo}. \n Eeeeeeeeee <@!${desafiador}> ganhoooooou!`);
                }
                else if (jogadaAuthor === '✌️' && jogadaAlvo === '✋') {
                    message.channel.send(`<@!${desafiador}> jogou ${jogadaAuthor} e <@!${alvo}> jogou ${jogadaAlvo}. \n Eeeeeeeeee <@!${desafiador}> ganhoooooou!`);
                }
                else if (jogadaAuthor === '✋' && jogadaAlvo === '👊') {
                    message.channel.send(`<@!${desafiador}> jogou ${jogadaAuthor} e <@!${alvo}> jogou ${jogadaAlvo}. \n Eeeeeeeeee <@!${desafiador}> ganhoooooou!`);
                }
                else if (jogadaAuthor === jogadaAlvo) {
                    message.channel.send(`<@!${desafiador}> jogou ${jogadaAuthor} e <@!${alvo}> jogou ${jogadaAlvo}. \n Eeeeeeeeee deu EMPATE, incrível.`);
                }
                else {
                    message.channel.send(`<@!${desafiador}> jogou ${jogadaAuthor} e <@!${alvo}> jogou ${jogadaAlvo}. \n Eeeeeeeeee <@!${alvo}> ganhoooooou!`);
                }
            }, 4000);
        }, 10001);
    }
};