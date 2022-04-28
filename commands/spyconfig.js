const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'spyconfig',
    description: 'config do spyfall do astro',
    async execute(message, args) {
        const config = fs.readFileSync('./jsons/spyconfig.json');
        const jsonConfig = JSON.parse(config);

        const oldTempo = jsonConfig.tempo;
        const oldSpy = jsonConfig.spy;

        const actConfigs = new MessageEmbed()
            .setColor([45, 25, 52])
            .setTitle('Atuais configurações do Spyfall 🕵️')
            .setDescription('Essas são as atuais configurações do jogo, de tempo e quantidade de espiões, que serão válidas caso você dê o comando !spy.')
            .addFields(
                { name: 'Tempo de Jogo', value: `${oldTempo} segundos.`, inline: true },
                { name: 'Qtd. de Espiões', value: `${oldSpy}`, inline: true }
            );

        if (!args[0]) {
            message.channel.send({ embeds: [actConfigs] });
            return;
        }

        const comando = args[0];
        const comandos = ['tempo', 'spy', 'espiao', 'locais', 'local'];

        if (!comandos.includes(comando) || !args[1] || isNaN(args[1])) {
            message.reply('Para setar as configurações, você deve me dizer qual configuração quer alterar, "tempo" ou "spy" (para a quantidade de espiões na partida), seguido de quantos segundos ou espiões terá a partida. \nSaca, a sintaxe é "!spy config" ou "!spy start", depende do que cê quer. Se for configurar, lembra que tem que ser assim ô: "!spy config tempo 600".');
            return;
        }

        const numero = args[1];

        if (comando === 'tempo') {
            const newConfigs = new MessageEmbed()
            .setColor([45, 25, 52])
            .setTitle('Novas configurações do Spyfall 🕵️')
            .setDescription('Essas são as atuais configurações do jogo, de tempo e quantidade de espiões, que serão válidas caso você dê o comando !spy.')
            .addFields(
                { name: 'Tempo de Jogo', value: `${numero} segundos.`, inline: true },
                { name: 'Qtd. de Espiões', value: `${oldSpy}`, inline: true }
            );
            message.reply({ embeds: [newConfigs] });
            jsonConfig.tempo = numero;
            fs.writeFileSync('./jsons/spyconfig.json', JSON.stringify(jsonConfig));
            return;
        }

        if (comando === 'spy' || comando === 'espiao') {

            if (numero > 3) {
                message.reply('Hmmm... tu acha que vai ter espião demais, não? Repense... que tal no máximo 3?');
                return;
            }

            const newConfigs = new MessageEmbed()
            .setColor([45, 25, 52])
            .setTitle('Novas configurações do Spyfall 🕵️')
            .setDescription('Essas são as atuais configurações do jogo, de tempo e quantidade de espiões, que serão válidas caso você dê o comando !spy.')
            .addFields(
                { name: 'Tempo de Jogo', value: `${oldTempo} segundos.`, inline: true },
                { name: 'Qtd. de Espiões', value: `${numero}`, inline: true }
            );
            message.reply({ embeds: [newConfigs] });
            jsonConfig.spy = numero;
            fs.writeFileSync('./jsons/spyconfig.json', JSON.stringify(jsonConfig));
            return;
        }
    }
};