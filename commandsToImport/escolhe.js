const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'escolhe',
    description: 'tá indeciso? deixa que eu te ajudo',
    execute(message, args) {
        if (!args) {
            message.reply('Opa, a sintaxe do jogo é a seguinte: !escolhe "opção 1" "opção 2" "...opção 10". Você pode escolher quantas opções quiser!');
            return;
        }
        else if (args.length == 1) {
            message.reply('Então, seu tonto, vou escolher entre uma só opção?');
            return;
        }
        else {
            const resultado = args[parseInt(Math.random() * args.length)];
            const resposta = new MessageEmbed()
                .setColor([45, 25, 52])
                .setTitle('Qual escolher, qual escolher???')
                .setDescription(`Calma, ${message.author.username}! Eu te ajudo...`)
                .addFields({
                    name: 'Uni duni te, Salame minguê', value: `Um sorvete colorê, O escolhido foi você: __**${resultado}**__!`, inline: true
                })
                .setImage('https://c.tenor.com/jD9MdKIIp1gAAAAM/counting-baby.gif')
                .setFooter({ text: 'Agora vai ter que escolher esse mesmo, viu?' });
            message.reply({ embeds: [resposta] });
        }
    }
};