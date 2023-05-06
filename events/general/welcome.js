const { Events, EmbedBuilder } = require('discord.js');
const color = require('../../utils/color');

const rolesToAdd = ['683883629964820595', '815376261056168006', '815377284931387464', '815376676099850251', '813811893457518642', '814614439764033548'];

module.exports = {
  name: Events.GuildMemberAdd,
  execute(member) {
    const findRole = member.guild.roles.cache;

    rolesToAdd.forEach((role) => member.roles.add(findRole.find((r) => r.id === role)));

    const channel = member.guild.channels.cache.get('683797690185678911');

    const welcome = new EmbedBuilder()
      .setColor(color)
      .setTitle('Seja bem-vindo!')
      .setDescription('Olá  Esperamos que goste da sua estadia neste que é o survidor mais incrível de todos!')
      .setThumbnail('https://c.tenor.com/Qig8i0b3ANkAAAAd/dog-cute.gif')
      .addFields(
        { name: 'Que tal se apresentar?', value: 'Passa lá no <#683803077882413154> e fala mais sobre voce' },
        { name: 'Elas, as regrinhas', value: 'É, é chato! Porém, melhor ficar bem informado do que fazer besteira, né? Então <#788812108145229874>.' },
        { name: 'Os cargos', value: 'Um filósofo disse que um cargo vale mais que mil palavras, então vai lá buscar os seus em <#692708652703940638>!' },
        { name: 'Tudo certo!', value: 'Sem mais delongas, dá um pulo lá no <#683802803206094885> e vamos trocar uma ideia!' },
      );

    channel.send({ content: `<@!${member.user.id}>`, embeds: [welcome] });
  },
};
