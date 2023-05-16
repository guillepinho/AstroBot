const { useMasterPlayer } = require('discord-player');

module.exports = () => {
  const player = useMasterPlayer();

  player.events.on('playerError', (message, code) => {
    console.log(`Erro ${code}: ${message}`);
  });
};
