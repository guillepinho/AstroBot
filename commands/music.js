const { SlashCommandBuilder } = require('@discordjs/builders');
const { useQueue, QueueRepeatMode } = require('discord-player');
const add = require('./sub/add');
const pause = require('./sub/pause');
const skip = require('./sub/skip');
const stop = require('./sub/stop');
const volume = require('./sub/volume');
const resume = require('./sub/resume');
const queueCommand = require('./sub/queue');
const loop = require('./sub/loop');
const help = require('./sub/help');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dj')
    .setDescription('Quer ouvir um somzão do bom do Astro DJ? VAMONESSSS!')
    .addSubcommand((subcommand) => subcommand
      .setName('adicionar')
      .setDescription('Adiciona na fila uma música ou playlist')
      .addStringOption((option) => option
        .setName('tipo')
        .setDescription('É playlist ou música?')
        .setChoices(
          { name: 'playlist', value: 'playlist' },
          { name: 'música', value: 'música' },
        )
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
      .setDescription('Pula a música atual'))
    .addSubcommand((subcommand) => subcommand
      .setName('limpar')
      .setDescription('Para de tocar e limpa a fila'))
    .addSubcommand((subcommand) => subcommand
      .setName('volume')
      .setDescription('Muda o volume da caixa de som')
      .addIntegerOption((option) => option
        .setName('volume')
        .setDescription('Volume da caixa de som')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(100)))
    .addSubcommand((subcommand) => subcommand
      .setName('fila')
      .setDescription('Mostra as próximas dez músicas da fila de músicas'))
    .addSubcommand((subcommand) => subcommand
      .setName('loop')
      .setDescription('Coloca a música atual ou a lista em loop, ou desliga')
      .addIntegerOption((option) => option
        .setName('tipo')
        .setDescription('Tipo de loop')
        .setRequired(true)
        .setChoices(
          { name: 'Música', value: QueueRepeatMode.TRACK },
          { name: 'Lista', value: QueueRepeatMode.QUEUE },
          { name: 'Desligado', value: QueueRepeatMode.OFF },
        )))
    .addSubcommand((subcommand) => subcommand
      .setName('ajuda')
      .setDescription('Mostra os comandos disponíveis do bot')),
  run: async ({ interaction }) => {
    await interaction.deferReply();

    if (interaction.options.getSubcommand() === 'ajuda') return help(interaction);

    const userVoiceChannel = interaction.member.voice.channel;
    if (!userVoiceChannel) return interaction.editReply('Você precisa estar conectado a um canal de voz para usar esse comando.');

    if (interaction.options.getSubcommand() === 'adicionar') return add(interaction, userVoiceChannel);

    const queue = useQueue(interaction.guildId);
    if (!queue || !queue.isPlaying()) return interaction.editReply('O DJ está descansando, não enche. Me chame quando for pra tocar.');

    switch (interaction.options.getSubcommand()) {
      case 'pausar':
        return pause(interaction, queue);
      case 'pular':
        return skip(interaction, queue);
      case 'limpar':
        return stop(interaction, queue);
      case 'volume':
        return volume(interaction, queue);
      case 'continuar':
        return resume(interaction, queue);
      case 'fila':
        return queueCommand(interaction, queue);
      case 'loop':
        return loop(interaction, queue);
      default:
        return null;
    }
  },
};
