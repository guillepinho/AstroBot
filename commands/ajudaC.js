const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ajudacons',
    description: 'list commands for admins',
    execute(message) {
        const rollEmbed = new MessageEmbed()
        .setColor([45, 25, 52])
        .setTitle('Precisando de ajuda, Consulheiro?')
        .setDescription('Bom, meu prefixo é o "**!**" e os meus comandos de admin são esses:')
        .setImage('https://media4.giphy.com/media/ZXBCFMGdx85ZVNal81/giphy.gif')
        .addFields(
            { name: 'clear', value: 'Limpa a quantidade de mensagens indicadas.' },
            { name: 'kick', value: 'Chuta a bunda do salafrário para fora do server.' },
            { name: 'ban', value: 'Martela o indivíduo para outra dimensão. Sem volta.' },
            { name: 'unban', value: 'Chama o Doutor Estranho para reparar a linha do tempo e trazer de volta.' },
            { name: 'add', value: 'Adiciona uma imagem aos comandos que usam imagens aleatórias, como !abs, !bj e !otako.' }
        )
        .setFooter({ text: 'AUqui, só patrões' });

        message.reply({ embeds: [rollEmbed] });
    }
};