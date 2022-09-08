const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = fs.readFileSync('./jsons/spyconfig.json');
const locations = require('../jsons/spylocs.json');

module.exports = {
  name: 'spyrecon',
  description: 'joguinho do spyfall do astro',
  async execute (message, args) {
    const jsonConfig = JSON.paser(config);

    
  }
}