module.exports = {
    name: 'kick',
    description: 'kick bitching dude out of server',
    execute(message, args) {
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
                message.reply('Opa, gostei da sua intenção, gosto de dar voadora... MAS EM QUEM?');
                return;
            }

            if (membro) {
                const membroAlvo = message.guild.members.cache.get(membro.id);

                // Checa se o membro é Consulheiro
                if (membroAlvo.roles.cache.has('684013101787512883')) {
                    message.reply('Infelizmente esse indivíduo é mais poderoso que eu e não posso executar o comando. <:su_retarded:683866460191457320>');
                    return;
                }

                membroAlvo.kick();
                message.delete();
                message.channel.send('Opaaaa, RATETETSURUGUIIIIIIIIIII!');
                message.channel.send('https://cdn.ome.lt/daLmQSa6aCQMjlozhN3XZSwv9H4=/770x0/smart/uploads/conteudo/fotos/Ryu_Tatsu.gif');
                message.channel.send(`O usuário ${membro} foi kickado com sucesso!`);

            }
            else {
                message.reply('Monsieur, não consegui encontrar esse usuário... me perdoa? Tenta de novo, não me demite <:su_pera:730223124557332540>');
            }
        }
    }
};