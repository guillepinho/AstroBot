// Requisitos
require('dotenv').config();
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const firebase = require('firebase');

// Criando clients
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

// Login bot
client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
    console.log(`I'M ALIVE BABY, HAHA... ops, estou vivo e operante no usuário "${client.user.tag}" às ${Date(Date.now())}!`);
    client.user.setActivity('você. Sou o astro! Digite !ajuda e veja meus comandos', { type: 'LISTENING' });
});

// Firebase Config
const firebaseConfig = require('./firebaseconfig.json');
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Commands Collection
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Prefixo
const prefix = '!';

// Comandos
client.on('messageCreate', async (message) => {
    if (
        !message.content.startsWith(prefix) ||
        message.author.bot ||
        message.content.includes('@here') ||
        message.content.includes('@everyone')) {
        return;
    }

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/);
    const command = args.shift().toLowerCase();

    // Comandos gerais
    switch (command) {
        case 'ping':
            client.commands.get('ping').execute(message, client);
            break;
        case 'id':
            client.commands.get('ping').execute(message, client);
            break;
        case 'criador':
            client.commands.get('criador').execute(message);
            break;
        case 'dado':
        case 'd':
            client.commands.get('dado').execute(message, args);
            break;
        case 'dadodm':
        case 'ddm':
            client.commands.get('dadoDM').execute(message, args);
            break;
        case 'oi':
            client.commands.get('saudacao').execute(message);
            break;
        case 'ajuda':
            client.commands.get('ajuda').execute(message);
            break;
        case 'fala':
            client.commands.get('fala').execute(message);
            break;
        case 'abs':
            client.commands.get('abs').execute(message, args);
            break;
        case 'bj':
            client.commands.get('bj').execute(message, args);
            break;
        case 'shake':
            client.commands.get('shake').execute(message, args);
            break;
        case 'escolhe':
            client.commands.get('escolhe').execute(message, args);
            break;
        case 'lero':
            client.commands.get('lero').execute(message, args);
            break;
        case 'avatar':
            client.commands.get('avatar').execute(client, message, args);
            break;
        case 'otako':
        case 'otaku':
        case 'otaco':
            client.commands.get('otako').execute(message);
            break;
        case 'jkp':
            client.commands.get('jkp').execute(message, args);
            break;
        case 'spy':
            client.commands.get('spy').execute(message, args);
            break;
        case 'spypara':
            client.commands.get('spypara').execute(message);
            break;
        case 'spyconfig':
            client.commands.get('spyconfig').execute(message, args);
            break;
        // Carteira
        // case 'carteira':
        //     client.commands.get('carteira').execute(message);
        //     break;
        // Comandos de Admin
        case 'ajudacons':
            client.commands.get('ajudacons').execute(message, args);
            break;
        case 'clear':
        case 'limpa':
            client.commands.get('clear').execute(message, args);
            break;
        case 'kick':
            client.commands.get('kick').execute(message, args);
            break;
        case 'ban':
            client.commands.get('ban').execute(message, args);
            break;
        case 'unban':
            client.commands.get('unban').execute(message, args);
            break;
        case 'add':
            client.commands.get('add').execute(message, args);
            break;
        // Error - comando não conhecido.
        default: message.reply('Opa, não conheço esse comando...');
            break;
    }
});

// Reações e respostas a mensagens sem comandos
client.on('messageCreate', (message) => {
    const msgL = message.content.toLowerCase();

    if (
        message.author.bot
    ) return;

    else if (msgL.includes('gostoso') || msgL.includes('gostosa')) {
        message.react('❤️');
    }

    else if (msgL.includes('bom dia')) {
        const bomDia = require('./jsons/bomDia.json');
        const values = Object.values(bomDia);
        const randomValue = values[parseInt(Math.random() * values.length)];
        message.channel.send(randomValue);
    }

    else if (msgL.includes('né astro')) {
        const neAstro = require('./jsons/neAstro.json');
        const values = Object.values(neAstro);
        const randomValue = values[parseInt(Math.random() * values.length)];
        message.channel.send(randomValue);
    }

    else if (msgL.includes('su') && (msgL.includes('lenzi'))) {
        const chances = parseInt(Math.random() * 10);

        const sulenzi = new MessageEmbed()
            .setTitle('SU & LENZI?')
            .setColor([45, 25, 52])
            .setDescription('<:lovesu:956897671761780746><:lovexuxu:956897693542789140>')
            .setImage('https://c.tenor.com/St8FpL2GUAUAAAAC/patrick-star-cute.gif')
            .setFooter({ text: 'Que cê tá falando do casal mar fofo do survidor? aaah gut gut' });

        if (chances <= 2) {
            message.reply({ embeds: [sulenzi] });
            message.react('❤️');
        }
    }

    else if (msgL.includes('muda muda')) {
        const muda = parseInt(Math.random() * 10);

        const mudamessage = new MessageEmbed()
            .setTitle('Ouvi MUDA?')
            .setColor([45, 25, 52])
            .setImage('https://c.tenor.com/R5BaBITnM3UAAAAd/giorno-part5.gif')
            .setFooter({ text: 'MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA' });

        if (muda <= 4) { message.reply({ embeds: [mudamessage] }); }
    }
});

// Controle de bocas sujas
const palavrao = require('./jsons/palavrao.json');
const palavras = Object.values(palavrao);
client.on('messageCreate', (message) => {
    const match = palavras.filter(e => message.content.toLowerCase().includes(e));
    if (match.length > 0) {
        const random = parseInt(Math.random() * 10);
        if (random <= 1) {
            message.reply(`Ôoooo ${message.author.username}, é com essa boca podre que cê beija seus peguete? <:su_todezoi:684780888261001324>`);
        }
    }
});

// Dar um olá as pessoas novinhas
client.on('guildMemberAdd', async member => {
    const findRole = member.guild.roles.cache;
    member.roles.add(findRole.find(role => role.id === '683883629964820595'));
    member.roles.add(findRole.find(role => role.id === '815376261056168006'));
    member.roles.add(findRole.find(role => role.id === '815377284931387464'));
    member.roles.add(findRole.find(role => role.id === '815376676099850251'));
    member.roles.add(findRole.find(role => role.id === '813811893457518642'));
    member.roles.add(findRole.find(role => role.id === '814614439764033548'));

    const canal = member.guild.channels.cache.get('683797690185678911');

    const ola = new MessageEmbed()
        .setColor([45, 25, 52])
        .setTitle('Seja bem-vindo!')
        .setDescription('Olá  Esperamos que goste da sua estadia neste que é o survidor mais incrível de todos!')
        .setThumbnail('https://c.tenor.com/Qig8i0b3ANkAAAAd/dog-cute.gif')
        .addFields(
            { name: 'Que tal se apresentar?', value: 'Passa lá no <#683803077882413154> e fala mais sobre voce' },
            { name: 'Elas, as regrinhas', value: 'É, é chato! Porém, melhor ficar bem informado do que fazer besteira, né? Então <#788812108145229874>.' },
            { name: 'Os cargos', value: 'Um filósofo disse que um cargo vale mais que mil palavras, então vai lá buscar os seus em <#692708652703940638>!' },
            { name: 'Tudo certo!', value: 'Sem mais delongas, dá um pulo lá no <#683802803206094885> e vamos trocar uma ideia!' }
        );

    canal.send(`<@!${member.user.id}>`);
    canal.send({ embeds: [ola] });
});

// Dar xau aos vacilão
client.on('guildMemberRemove', member => {
    const canal = member.guild.channels.cache.get('683797690185678911');
    canal.send(`**${member.user.username}** saiu do servidor, até mais! Volte sempre... Ou não, sei lá.`);
});

const CronJob = require('cron').CronJob;
const zeniReminder = new CronJob('0 9,12,15,18,21 * * *', async () => {
    const guild = client.guilds.cache.get('683797689544081444');

    if (guild) {
        const canal = guild.channels.cache.get('683802803206094885');
        try {
            await canal.send('<@$1009085595542372352>, eaí, já comeu? :spacer2:');
        } catch (error) {
            console.log(error);
        }
    }
});
zeniReminder.start();

// Auth link: https://discord.com/oauth2/authorize?client_id=950741775142752306&permissions=8&scope=bot