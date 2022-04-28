/* eslint-disable no-inner-declarations */
/* eslint-disable max-nested-callbacks */
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = fs.readFileSync('./jsons/spyconfig.json');
const locations = require('../jsons/spylocs.json');

module.exports = {
    name: 'spy',
    description: 'joguinho do spyfall do astro',
    async execute(message, args) {
        if (args[0] === 'help' || args[0] === 'como') {
            const help = new MessageEmbed()
                .setColor([45, 25, 52])
                .setTitle('Como jogar Spyfall? 🕵️')
                .setDescription('Aqui vai um resumo das regras e como se joga:')
                .addFields(
                    { name: 'Locais', value: 'Ao início de cada round, todos os jogadores recebem a informação de qual local estamos (sorteado dentre os disponíves em minha database). Apenas um (ou mais a depender das configurações) dos jogadores não sabe em qual local, ele é o espião.' },
                    { name: 'Cargos', value: 'Os cargos são distribuídos aleatoriamente entre os jogadores e todos eles tem relação com o local sorteado, são profissões ou tipos de pessoas comuns ao ambiente. O espião, por outro lado, recebe apenas o cargo de espião.' },
                    { name: 'Como Joga?', value: 'O jogo sorteará uma pessoa que começa a partida. Ela irá escolher um dos jogadores para responder uma pergunta que, após responder, deve fazer uma pergunta para outro jogador qualquer, com exceção do que acabou de fazer uma pergunta (ou seja, nada de ping-pong entre dois jogadores). Mas que tipo de pergunta? Calma, jovem padawan, já te explico!' },
                    { name: 'Objetivos', value: 'O objetivo dos jogadores não-espiões é trabalhar em grupo para descobrir quem é o espião, para isso servem as perguntas! Os jogadores conversarão com perguntas e respostas, tentando não entregar qual o local em que todos estão, mas, ao mesmo tempo, demonstrando que não são o espião. E o espião? Bom, o trabalho dele é se misturar entre os jogadores, os convencendo que também não é espião, enquanto tenta decifrar através das perguntas e respostas qual é o local em que todos estão.' },
                    { name: 'Como ganha?', value: 'O espião ganha se descobrir com sucesso qual o local ou, se esgotado o tempo de partida, não descobrirem que ele é o espião. Os outros jogadores ganham ao descobrir quem é o espião.' },
                    { name: 'Votos', value: 'A qualquer momento os jogadores podem chamar uma votação (inclusive o espião, hein?), para denunciar um dos jogadores como o espião. Caso a maioria concorde em abrir votação, todos devem votar em quem acham que é o espião. Caso o tempo se encerre, a votação é aberta automaticamente. Se o espião for descoberto, ele tem o direito de "chutar" o local uma única vez, se acertar, ele ainda vence!' })
                .setImage('https://c.tenor.com/txDqgTLcIW0AAAAC/spy-spying.gif');
            message.channel.send({ embeds: [help] });
        }
        else {
            let filter;

            const jsonConfig = JSON.parse(config);

            let tempo = jsonConfig.tempo;
            const spy = jsonConfig.spy;
            const tempoPartida = jsonConfig.tempo;

            var runTimer = Boolean;

            let interval;
            let msgTimer;

            async function timer(parametro) {
                if (parametro === 1) {
                    msgTimer = await message.channel.send(`__Timer__: ${tempo} segundos`);
                    interval = setInterval(() => {
                        runTimer = true;
                        tempo -= 3;
                        msgTimer.edit(`__Timer__: ${tempo} segundos`);
                        if (tempo <= 0) {
                            runTimer = false;
                            clearInterval(interval);
                            msgTimer.edit('**TEMPO ESGOTADO!**');
                        }
                    }, 3000);
                    return;
                }
                if (parametro === 0) {
                    runTimer = false;
                    clearInterval(interval);
                    msgTimer.edit('**JOGO ENCERRADO!**');
                    return;
                }
            }

            const jogo = {
                jogadores: []
            };

            const chamaSpy = new MessageEmbed()
                .setColor([45, 25, 52])
                .setTitle('GAME TIIIME!')
                .setDescription(`${message.author.username}, está convidando geral para um partidinha de **SPYFALL**, quem topa? Só reagir ao emoji do espião em 30 segundos, se não você tá fora, teje avisado!`)
                .setImage('https://c.tenor.com/vhxaixvLUz4AAAAd/stalking-spying.gif')
                .addFields({
                    name: 'Como jogar?', value: 'Cada pessoa receberá um cargo relacionado à um local. Os espiões não sabem que local é esse e devem se misturar e se disfarçar, até descobrirem qual é o local. Os outros devem trabalhar em conjunto para expor quem é o espião, sem entregar qual o local que está.'
                });

            let msgLista = '__**Lista de jogadores**__:';

            message.channel.send({ embeds: [chamaSpy] })
                .then(async (msg) => {
                    msg.react('🕵️');
                    let contadorPessoas = 0;
                    const lista = await message.channel.send(msgLista);
                    let clear = false;

                    filter = (reaction, user) => {
                        return !user.bot;
                    };

                    const coletor = msg.createReactionCollector({
                        filter,
                        time: 1000 * 30,
                        dispose: true
                    });

                    coletor.on('collect', (reaction, user) => {
                        if (reaction.emoji.name === '🕵️') {
                            contadorPessoas++;
                            jogo.jogadores.push({
                                id: user.id
                            });
                            msgLista = msgLista + `\n • <@!${user.id}>`;
                            lista.edit(msgLista);
                        }
                    });

                    coletor.on('remove', (reaction) => {
                        if (reaction.emoji.name === '🕵️') {
                            clear = true;
                            message.channel.send('Alguém removeu a reação, para não confundir tudo, vou cancelar o jogo, ok?');
                        }
                    });

                    coletor.on('end', async (collected) => {
                        if (clear == true) {
                            return;
                        }
                        const local = locations.locais[Math.floor(Math.random() * (locations.locais.length + 1))];

                        const actConfigs = new MessageEmbed()
                            .setColor([45, 25, 52])
                            .setTitle('Atuais configurações do Spyfall 🕵️')
                            .setDescription('Essas são as atuais configurações do jogo que irá rolar!')
                            .addFields(
                                { name: 'Tempo de Jogo', value: `${tempoPartida} segundos.`, inline: true },
                                { name: 'Qtd. de Espiões', value: `${spy}`, inline: true }
                            );
                        if (collected.size === 0) {
                            message.channel.send('Má rapai... ninguém vai jogar? Oxe.');
                            return;
                        }
                        if (contadorPessoas < 4) {
                            message.channel.send('Legal, Legal... mas tem pouca gente para jogar. Melhor tentarmos de novo depois, tá? Procura mais gente! 🕵️');
                            return;
                        }
                        else {
                            message.channel.send('Ok, me parece que temos jogadores o suficiente!! Que comecem as espionagens! 🕵️')
                            .then(msgOk => setTimeout(function() {
                                msgOk.delete();
                            }, 15000));
                            message.channel.send({ embeds: [actConfigs] })
                                .then(async msgC => {
                                    setTimeout(function() {
                                        msgC.delete();
                                    }, 15000);

                                    const spies = jogo.jogadores[Math.floor(Math.random() * jogo.jogadores.length)];
                                    spies.cargo = 'Espião';
                                    spies.loc = 'Desconhecida';

                                    for (let i = 0; i < jogo.jogadores.length; i++) {
                                        if (jogo.jogadores[i].cargo !== 'Espião') {
                                            jogo.jogadores[i].loc = local.nome;
                                            jogo.jogadores[i].cargo = local.cargos[i];
                                        }
                                    }

                                    const comeca = jogo.jogadores[Math.floor(Math.random() * jogo.jogadores.length)].id;

                                    let listaLocais = '';

                                    for (let j = 0; j < locations.locais.length; j++) {
                                        listaLocais += '• ' + locations.locais[j].nome + '\t \t';
                                        if (j > 0 && j % 4 === 0) {
                                            listaLocais += '\n';
                                        }
                                    }

                                    jogo.jogadores.forEach(jogador => {
                                        message.client.users.fetch(jogador.id).then(usuario => {
                                            usuario.send(`A localização é **${jogador.loc}**. Seu cargo é **${jogador.cargo}**. \n__A lista de locais disponíveis é a seguinte__:\n${listaLocais}`)
                                                // eslint-disable-next-line no-unused-vars
                                                .catch(error => {
                                                    message.channel.send(`Aí ce complica... tem um zé ruela ai, não vou dizer quem é o <@!${jogador.id}>, que tem DM fechada, meu patrão... PÔ, COMO VAI JOGAR ASSIM CARA?`);
                                                    return;
                                                });
                                        });
                                    });

                                    message.channel.send(`Quem começa o jogo é: **<@!${comeca}>**.`)
                                        .then(msgComeça => setTimeout(function() {
                                            msgComeça.delete();
                                        }, 15000));

                                    message.channel.send(`Pronto, todos já receberam seus cargos no PV, vou dar 15 segundos para vocês lerem tudo com calma e jájá começo o timer de ${tempo} segundos. O tempo iniciará __**assim**__ que essa mensagem for apagada.`)
                                        .then(msgReady => setTimeout(function() {
                                            msgReady.delete();
                                        }, 15000));

                                    setTimeout(function() {
                                        timer(1);
                                    }, 15000);

                                    setTimeout(function() {
                                        timer(0);
                                    }, 30000);
                                });
                        }
                    });

                    filter = m => m.content.includes('spycabo');
                    const coletorFim = message.channel.createMessageCollector({
                        filter,
                        time: (tempoPartida * 1000 + 15000)
                    });

                    coletorFim.on('collect', m => {
                        if (runTimer === false || runTimer === undefined) {
                            m.reply('Êeeeh laia. Não tem jogo do spyfall rodando, seu tonto.');
                            return;
                        }
                        if (runTimer == true) {
                            timer(0);
                        }
                    });

                    coletorFim.on('end', collected => {
                        console.log(`Collected ${collected.size} items`);
                    });
                });
        }
    }
};