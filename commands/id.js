module.exports = {
    name: 'id',
    description: 'get user id',
    execute(message, args) {
        if (args == '') {
            message.reply(`Oi, <@!${message.author.id}>! Sua tag no discord é a ${message.author.tag}, seu usuário é o ${message.author.username} e seu ID é o ${message.author.id}.`);
        }
        else if (!message.content.includes('<@')) {
            message.reply(`Oi, <@!${message.author.id}>! Tem algo errado aí, você mandou o usuário certo? Marca a pessoa depois do comando!`);
        }
        else if (args.length > 1) {
            message.reply(`Oi, <@!${message.author.id}>! Tudo bem, querido? Marca uma pessoa só por vez tá? Eu sou remunerado por comando utilizado, 'mim' ajude.`);
        }
        else {
            const getuser = message.mentions.members.first();
            message.reply(`Oi, <@!${message.author.id}>! A tag no discord do(a) ${message.mentions.members.first()} é a ${getuser.user.tag}, o usuário dele(a) é o ${getuser.user.username} e o ID dele(a) é o ${getuser.user.id}.`);
        }
    }
};