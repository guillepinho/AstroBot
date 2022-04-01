const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'criador',
    description: 'who\'s my creator?',
    execute(message) {
        const rollEmbed = new MessageEmbed()
        .setColor([45, 25, 52])
        .setTitle('Quer saber quem me criou?')
        .setDescription('Meus criadores são o Prodd e o Guille!')
        .setImage('https://media.giphy.com/media/861TMGFCNNtb9OgH4q/giphy.gif')
        .setFooter({ text: 'Oi mundo! Ainda sou um bebezão.' });

        message.reply({ embeds: [rollEmbed] });
    }
};