const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;

const commandLoader = async (commands) => {
  try {
    console.log('Fazendo deploy dos comandos');
    const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log('Comandos carregados com sucesso');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = commandLoader;
