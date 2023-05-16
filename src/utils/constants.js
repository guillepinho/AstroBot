const second = 1000;

const color = [113, 54, 138];
const titleDJEmbed = '🎶 DJ Astro 🎶';
const timeToReact = 15 * second;

const playerNodeOptions = {
  skipOnNoStream: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 15000, // 15 seconds
  leaveOnStop: true,
  leaveOnStopCooldown: 15000, // 15 seconds
  leaveOnEnd: true,
  leaveOnEndCooldown: 15000, // 15 seconds
};

module.exports = {
  color,
  titleDJEmbed,
  timeToReact,
  playerNodeOptions,
};
