const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'BAN 4 EVER',
  async execute(message, args) {
    if (!message.member.roles.cache.has('684013101787512883')) {
      message.reply('Hmmm... vi aqui nos meus controles que você não tem esse poder, moço. <:su_panda2:697163015891583076>');
      return;
    }

    if (message.mentions.members.size !== 1) {
      message.reply('Opa, gostei da sua intenção, gosto de dar martelada... MAS EM QUEM? A sintaxe tem que ser: !ban @infeliz "razão"');
      return;
    }

    const membro = message.mentions.users.first();
    const razao = args.slice(1).join(' ');

    try {
      const membroAlvo = message.guild.members.cache.get(membro.id);
      if (membroAlvo.roles.cache.has('684013101787512883')) {
        message.reply('Infelizmente esse indivíduo é mais poderoso que eu e não posso executar o comando. <:su_retarded:683866460191457320>');
        return;
      }
      message.delete();

      const banMsg = new MessageEmbed()
        .setColor([45, 25, 52])
        .setTitle('LÁAAA VAAAAAAAAAAI O MARTELO!')
        .setDescription(`SIIIM! Seu pedido é uma ordem! O membro ${membroAlvo} foi banido com suuuuuuuucesso!`)
        .setImage('https://c.tenor.com/QHkT9KEz0pYAAAAd/boom-hammer-smash.gif')
        .addFields({
          name: 'Razão', value: razao,
        });

      message.channel.send({ embeds: [banMsg] })
        .then(() => {
          membroAlvo.ban();
        });
    }
    catch (error) {
      message.reply('Monsieur, não consegui encontrar esse usuário... me perdoa? Tenta de novo, não me demite <:su_pera:730223124557332540>');
    }
  }
};