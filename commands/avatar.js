const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'mostra o avatar do migo',
  execute(client, message, args) {
    const alvo = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const avatar = alvo.avatarURL({ dynamic: true, format: 'png', size: 1024 });
    
    const send = new MessageEmbed()
      .setColor([45, 25, 52])
      .setTitle(`:camera_with_flash: ${alvo.username}`)
      .setImage(avatar);

    message.channel.send({ embeds: [send] });
  }
};