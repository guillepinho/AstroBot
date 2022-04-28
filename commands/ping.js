module.exports = {
    name: 'ping',
    description: 'this is the basic ping command',
    execute(message, client) {
        message.reply(`🏓 POOOOONG! O tempo de resposta foi **${Date.now() - message.createdTimestamp} ms**. Já a latência do API foi **${Math.round(client.ws.ping)}** ms.`);
    }
};