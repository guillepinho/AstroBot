module.exports = {
    name: 'clear',
    description: 'clear messages',
    async execute(message, args) {
        const numero = parseInt(args[0]);

        if (!message.member.roles.cache.has('684013101787512883')) {
            message.reply('Hmmm... vi aqui nos meus controles que você não tem esse poder, moço. <:su_panda2:697163015891583076>');
            return;
            }
            else {

            if (!args[0]) {
                message.channel.send(` <@!${message.author.id}>, certo, eu apago... mas quantas cê quer que eu apague?`);
            }
            else if (isNaN(numero)) {
                message.channel.send('Opa, esse argumento não é um número. Tente novamente mais tarde.');
            }
            else if (numero > 100) {
                message.channel.send('Rapaz... Mô preguiça aqui, pode ser menos de 100 não?');
            }
            else if (numero < 1) {
                message.channel.send('Moço, me diga um número maior que 0, né?');
            }
            else {
                await message.channel.messages.fetch({ limit: numero + 1 })
                .then(messages => { setTimeout(() => message.channel.bulkDelete(messages), 3000);});

                message.delete();
                message.channel.send(`_apagando ${numero} mensagens... atenção, essa mensagem também se autodestruira em 3 segundos!_`)
                .then(msg => { setTimeout(() => msg.delete(), 3000);});
            }
    }
    }
};