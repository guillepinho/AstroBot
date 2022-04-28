module.exports = {
    name: 'fala',
    description: 'bot papagaio',
    async execute(message) {
        message.delete();
        const prefix = '!fala';
        const papagaio = message.content.slice(prefix.length).trim();
        await message.channel.send(papagaio);
    }
};