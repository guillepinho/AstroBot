module.exports = {
    name: 'clear',
    description: 'clear messages',
    async execute(message, args) {

        // if (!message.member.roles.cache.has('684013101787512883')) {
        //     message.reply('Hmmm... vi aqui nos meus controles que você não tem esse poder, moço. <:su_panda2:697163015891583076>');
        //     return;
        // }

        const numero = parseInt(args[0]);

        if (!args[0] || isNaN(numero)) {
            message.reply('Erro de sintaxe, camarada. Correto é: !clear "numero". Mas me ajuda tá? Um número tipo 1, 2, não me vem com "dois"....');
            return;
        }

        if (numero > 100 || numero < 1) {
            message.reply('Rapaz... um número entre 1 e 100, pode ser?');
            return;
        }


        await message.channel.messages.fetch({ limit: numero + 1 })
            .then(messages => { setTimeout(() => message.channel.bulkDelete(messages), 5000); });

        message.delete();
        message.channel.send(`_apagando ${numero} mensagens... atenção, essa mensagem também se autodestruira em 5 segundos!_`)
            .then(msg => { setTimeout(() => msg.delete(), 5000); });
    }
};