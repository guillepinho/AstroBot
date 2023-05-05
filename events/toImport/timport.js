// Controle de bocas sujas
const palavras = Object.values(palavrao);
client.on('messageCreate', (message) => {
  const match = palavras.filter((e) => message.content.toLowerCase().includes(e));
  if (match.length > 0) {
    const random = parseInt(Math.random() * 10);
    if (random <= 1) {
      message.reply(`Ôoooo ${message.author.username}, é com essa boca podre que cê beija seus peguete? <:su_todezoi:684780888261001324>`);
    }
  }
});

// Dar um olá as pessoas novinhas
client.on('guildMemberAdd', async (member) => {
  const findRole = member.guild.roles.cache;
  member.roles.add(findRole.find((role) => role.id === '683883629964820595'));
  member.roles.add(findRole.find((role) => role.id === '815376261056168006'));
  member.roles.add(findRole.find((role) => role.id === '815377284931387464'));
  member.roles.add(findRole.find((role) => role.id === '815376676099850251'));
  member.roles.add(findRole.find((role) => role.id === '813811893457518642'));
  member.roles.add(findRole.find((role) => role.id === '814614439764033548'));

  const canal = member.guild.channels.cache.get('683797690185678911');

  const ola = new MessageEmbed()
    .setColor([45, 25, 52])
    .setTitle('Seja bem-vindo!')
    .setDescription('Olá  Esperamos que goste da sua estadia neste que é o survidor mais incrível de todos!')
    .setThumbnail('https://c.tenor.com/Qig8i0b3ANkAAAAd/dog-cute.gif')
    .addFields(
      { name: 'Que tal se apresentar?', value: 'Passa lá no <#683803077882413154> e fala mais sobre voce' },
      { name: 'Elas, as regrinhas', value: 'É, é chato! Porém, melhor ficar bem informado do que fazer besteira, né? Então <#788812108145229874>.' },
      { name: 'Os cargos', value: 'Um filósofo disse que um cargo vale mais que mil palavras, então vai lá buscar os seus em <#692708652703940638>!' },
      { name: 'Tudo certo!', value: 'Sem mais delongas, dá um pulo lá no <#683802803206094885> e vamos trocar uma ideia!' },
    );

  canal.send(`<@!${member.user.id}>`);
  canal.send({ embeds: [ola] });
});

// Dar xau aos vacilão
client.on('guildMemberRemove', (member) => {
  const canal = member.guild.channels.cache.get('683797690185678911');
  canal.send(`**${member.user.username}** saiu do servidor, até mais! Volte sempre... Ou não, sei lá.`);
});
