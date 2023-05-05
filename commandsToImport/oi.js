const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'saudacao',
    description: 'just saying hi',
    execute(message) {
        const status = require('../jsons/status.json');
        const values = Object.values(status);
        const randomValue = values[parseInt(Math.random() * values.length)];
        const rollEmbed = new MessageEmbed()
        .setColor([45, 25, 52])
        .setTitle('Olá! Me chamo Astro!')
        .setDescription('Sou o bot do Survidor! Eu ainda estou em desenvolvimento, mas em breve vou poder entreter vocês!')
        .addFields({ name: 'Quer saber meu atual status de desenvolvimento?', value: 'No atual momento, tive um probleminha. ' + randomValue })
        .setImage('https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif')
        .setFooter({ text: 'Imagens do Guille neste momento' });

        message.reply({ embeds: [rollEmbed] });
    }
};