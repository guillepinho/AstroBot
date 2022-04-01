const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'otako',
    description: 'otako troxa',
    execute(message) {
        const otakoI = require('../jsons/otako.json');
        const randomValue = otakoI[parseInt(Math.random() * otakoI.length)].link;
        const otakoM = new MessageEmbed()
        .setColor([45, 25, 52])
        .setImage(randomValue);

        message.reply({ embeds: [otakoM] });
    }
};