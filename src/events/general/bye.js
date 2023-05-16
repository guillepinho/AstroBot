const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberRemove,
  execute(member) {
    const channel = member.guild.channels.cache.get('683797690185678911');
    channel.send(`**${member.user.username}** saiu do servidor, até mais! Volte sempre... Ou não, sei lá.`);
  },
};
