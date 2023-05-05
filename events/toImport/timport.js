// Reações e respostas a mensagens sem comandos
client.on('messageCreate', (message) => {
  const msgL = message.content.toLowerCase();
  if (msgL.includes('gostoso') || msgL.includes('gostosa')) {
    message.react('❤️');
  } else if (msgL.includes('bom dia')) {
    const bomDia = require('./jsons/bomDia.json');
    const values = Object.values(bomDia);
    const randomValue = values[parseInt(Math.random() * values.length)];
    message.channel.send(randomValue);
  } else if (msgL.includes('né astro')) {
    const neAstro = require('./jsons/neAstro.json');
    const values = Object.values(neAstro);
    const randomValue = values[parseInt(Math.random() * values.length)];
    message.channel.send(randomValue);
  } else if (msgL.includes('su') && (msgL.includes('lenzi'))) {
    const chances = parseInt(Math.random() * 10);

    const sulenzi = new MessageEmbed()
      .setTitle('SU & LENZI?')
      .setColor([45, 25, 52])
      .setDescription('<:lovesu:956897671761780746><:lovexuxu:956897693542789140>')
      .setImage('https://c.tenor.com/St8FpL2GUAUAAAAC/patrick-star-cute.gif')
      .setFooter({ text: 'Que cê tá falando do casal mar fofo do survidor? aaah gut gut' });

    if (chances <= 2) {
      message.reply({ embeds: [sulenzi] });
      message.react('❤️');
    }
  } else if (msgL.includes('muda muda')) {
    const muda = parseInt(Math.random() * 10);

    const mudamessage = new MessageEmbed()
      .setTitle('Ouvi MUDA?')
      .setColor([45, 25, 52])
      .setImage('https://c.tenor.com/R5BaBITnM3UAAAAd/giorno-part5.gif')
      .setFooter({ text: 'MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA' });

    if (muda <= 4) { message.reply({ embeds: [mudamessage] }); }
  }
});

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
