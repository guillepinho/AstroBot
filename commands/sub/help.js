const astroEmbed = require('../../utils/DJAstroEmbed');

module.exports = async (interaction) => {
  astroEmbed.setDescription('Aqui está a lista de comandos musicais (**/dj**) que eu txu-ru-binbos txu-ru-bonbos tuts tuts tuts:\n\u200b')
    .setThumbnail('https://media2.giphy.com/media/T7ukTzXQVmWqI/giphy.gif?cid=ecf05e47zmmsnc05j64hs7p14y9cu47ca6ffzhc91bej4oyi')
    .addFields(
      { name: '/dj ajuda:', value: 'Mostra esta lista de comandos disponíveis para DJ.' },
      { name: '/dj adicionar:', value: 'Adiciona uma música ou playlist à fila (você precisa especificar).' },
      { name: '/dj pausar:', value: 'Pausa a música atual.' },
      { name: '/dj continuar:', value: 'Retoma a música pausada.' },
      { name: '/dj pular:', value: 'Pula a música atual e toca a próxima da lista.' },
      { name: '/dj limpar:', value: 'Para de tocar músicas e limpa a fila.' },
      { name: '/dj volume:', value: 'Ajusta o volume da música atual (entre 0% e 100%).' },
      { name: '/dj loop:', value: 'Ativa ou desativa o loop da música atual ou da lista inteira.' },
      { name: '/dj fila:', value: 'Mostra a lista das próximas 10 músicas que estão na fila.' },
    );

  return interaction.editReply({ embeds: [astroEmbed] });
};
