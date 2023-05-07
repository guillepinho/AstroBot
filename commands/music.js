const { SlashCommandBuilder } = require('@discordjs/builders');
const { useQueue } = require('discord-player');
const add = require('./sub/add');
const pause = require('./sub/pause');
const skip = require('./sub/skip');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dj')
    .setDescription('Quer ouvir um somzão do bom do Astro DJ? VAMONESSSS!')
    .addSubcommand((subcommand) => subcommand
      .setName('adicionar')
      .setDescription('Adiciona na fila uma música ou playlist')
      .addBooleanOption((option) => option
        .setName('playlist')
        .setDescription('Se a URL for de uma playlist, adiciona todas as músicas da playlist na fila')
        .setRequired(true))
      .addStringOption((option) => option
        .setName('url')
        .setDescription('URL da música ou playlist')
        .setRequired(true)))
    .addSubcommand((subcommand) => subcommand
      .setName('pausar')
      .setDescription('Pausa a música atual'))
    .addSubcommand((subcommand) => subcommand
      .setName('continuar')
      .setDescription('Continua a música atual'))
    .addSubcommand((subcommand) => subcommand
      .setName('pular')
      .setDescription('Pula a música atual')),
  run: async ({ interaction }) => {
    await interaction.deferReply();

    const userVoiceChannel = interaction.member.voice.channel;
    if (!userVoiceChannel) return interaction.editReply('Você precisa estar conectado a um canal de voz para usar esse comando.');

    if (interaction.options.getSubcommand() === 'adicionar') return add(interaction, userVoiceChannel);

    const queue = useQueue(interaction.guildId);
    if (!queue || !queue.isPlaying()) return interaction.editReply('O DJ está descansando, não enche. Me chame quando for pra tocar.');

    if (interaction.options.getSubcommand() === 'pausar') return pause(interaction, queue);

    if (interaction.options.getSubcommand() === 'pular') return skip(interaction, queue);

    return null;
  },
};
