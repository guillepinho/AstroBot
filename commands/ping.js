module.exports = {
    name: 'ping',
    description: 'this is the basic ping command',
    execute(message) {
        message.reply(`PONG! Você pode parar de ficar me pingando o tempo todo, <@!${message.author.id}>?`);
    }
};