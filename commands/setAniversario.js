module.exports = {
     name: 'setAniversario',
     description: 'Adicione um usuario e seu aniversário',
    execute(message) {
        const num = 1;

        if (num === 1) {
            message.reply('Moço, esse comando ainda não tá 100%, volte amanhã e teste, tá?');
        }
        else {
            const { PrismaClient } = require('@prisma/client');

        const prisma = new PrismaClient();
        const info = message.content.split(' ');

        const user = info[1];
        const dataAniversario = info[2];

        prisma.usuarios.create({
            data:{
                user: user,
                dataNascimento: dataAniversario
            }
        })
        .then(() => {
           message.reply(`Usuario criado com sucesso <@!${message.author.id}>`);
        }).catch((err) => {
            message.reply(`erro ao criar usuario <@!${message.author.id}>`);
            console.log(err);
        });
        }
    }
};