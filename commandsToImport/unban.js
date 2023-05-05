module.exports = {
    name: 'unban',
    description: 'unban',
    async execute(message, args) {
        if (!message.member.roles.cache.has('684013101787512883')) {
            message.reply('Hmmm... vi aqui nos meus controles que você não tem esse poder, moço. <:su_panda2:697163015891583076>');
            return;
            }
            else {
                const membro = args[0];

                if (!args[0]) {
                    message.reply('Opa, coração amoleceu... para quem daremos o perdão celestial?');
                    return;
                }

                if (membro) {
                    const banidos = await message.guild.bans.fetch();
                    const membroAlvo = banidos.get(membro);

                    if (!membroAlvo) {
                        message.reply('Olha, acho que esse daí não tá banido não... valeu a intenção, né?');
                    }
                    else {
                        message.channel.guild.members.unban(membro);
                        message.delete();
                        message.channel.send('Doutor Estranho, chega aí! Precisamos corrigir uns erros do passado, vamos na linha do tempo!');
                        message.channel.send('https://giffiles.alphacoders.com/214/214286.gif');
                        message.channel.send(`O <@!${membro}> foi desbanido, com sucesso!`);
                    }
                }
                else {
                    message.reply('Monsieur, não consegui encontrar esse usuário... me perdoa? Tenta de novo, não me demite <:su_pera:730223124557332540>');
                }
            }
    }
};