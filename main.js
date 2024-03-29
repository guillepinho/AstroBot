// Requisitos ---------------------------------------------------------------------------
require('dotenv').config();
const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const commandsLoader = require('./src/utils/commandsLoader');
const musicPlaying = require('./src/events/music/musicPlaying');
const playerError = require('./src/events/music/playerError');

const LOAD_SLASH = process.argv[2] === 'load';

// Criando client do bot ----------------------------------------------------------------
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

// Configuração do áudio player ---------------------------------------------------------
const player = Player.singleton(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    // eslint-disable-next-line no-bitwise
    highWaterMark: 4194304,
  },
});
player.extractors.loadDefault();

// Commands Collection -------------------------- Configuração dos Comandos -------------
client.slashcommands = new Collection();

const commands = [];
const slashFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'));

slashFiles.forEach((cmd) => {
  const commandToAdd = require(`./src/commands/${cmd}`);
  client.slashcommands.set(commandToAdd.data.name, commandToAdd);
  if (LOAD_SLASH) commands.push(commandToAdd.data.toJSON());
});

if (LOAD_SLASH) {
  commandsLoader(commands);
} else {
  // Bot Ready --------------------------------------------------------------------------
  client.on('ready', () => {
    console.log(`I'M ALIVE BABY, HAHA... ops, estou vivo e operante no usuário "${client.user.tag}" às ${Date(Date.now())}!`);
    client.user.setActivity('você. Sou o astro! Digite !ajuda e veja meus comandos', { type: 'LISTENING' });
  });

  // Bot Interaction --------------------------------------------------------------------
  client.on('interactionCreate', (interaction) => {
    async function handleCommand() {
      if (!interaction.isCommand()) return;

      const cmd = client.slashcommands.get(interaction.commandName);
      if (!cmd) interaction.reply('Não possuo conhecimento deste comando.');

      await cmd.run({ client, interaction });
    }
    handleCommand();
  });

  // Bot Listeners ----------------------------------------------------------------------
  // Message Listeners
  const eventFiles = fs.readdirSync('./src/events/general').filter((file) => file.endsWith('.js'));

  eventFiles.forEach((file) => {
    const event = require(`./src/events/general/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
  });

  // Music Listener
  musicPlaying();
  playerError();

  // Login bot --------------------------------------------------------------------------
  client.login(process.env.DISCORD_TOKEN);
}

// Auth link: https://discord.com/oauth2/authorize?client_id=950741775142752306&permissions=8&scope=bot
