module.exports = {
    name: 'ban',
    description: 'BAN 4 EVER',
    async execute(message, args) {
        if (!message.mentions.members.size > 0) {
            message.reply('Cê marca a pessoa, pra eu encontrar ela?');
            return;
        }
        else if (message.mentions.members.size > 1) {
            message.reply('Calma, calma. Um de cada vez, tá?');
            return;
        }

        const membro = message.mentions.users.first();

        if (!message.member.roles.cache.has('684013101787512883')) {
            message.reply('Hmmm... vi aqui nos meus controles que você não tem esse poder, moço. <:su_panda2:697163015891583076>');
            return;
        }
        else {
            if (!args[0]) {
                message.reply('Opa, gostei da sua intenção, gosto de dar martelada... MAS EM QUEM?');
                return;
            }

            if (membro) {
                const membroAlvo = message.guild.members.cache.get(membro.id);

                // Checa se o membro é Consulheiro
                if (membroAlvo.roles.cache.has('684013101787512883')) {
                    message.reply('Infelizmente esse indivíduo é mais poderoso que eu e não posso executar o comando. <:su_retarded:683866460191457320>');
                    return;
                }

                    membroAlvo.ban();
                    message.delete();
                    message.channel.send('Sim, sim, claro! Seu pedido é uma ordem. LÁAAA VAAAAAAAAAAI O MARTELO!');
                    message.channel.send('https://c.tenor.com/QHkT9KEz0pYAAAAd/boom-hammer-smash.gif');
                    message.channel.send(`O ${membro} foi banido com sucesso!`);
                }
                else {
                    message.reply('Monsieur, não consegui encontrar esse usuário... me perdoa? Tenta de novo, não me demite <:su_pera:730223124557332540>');
                }
            }
        }
    };