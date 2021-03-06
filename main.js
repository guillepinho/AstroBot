// Requisitos
require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');
const Discord = require('discord.js');
const fs = require('fs');

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

client.player = new Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});

// Login bot
client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
    console.log(`I'M ALIVE BABY, HAHA... ops, estou vivo e operante no usuário "${client.user.tag}" às ${Date(Date.now())}!`);
    client.user.setActivity('você. Sou o astro! Digite !ajuda e veja meus comandos', { type: 'LISTENING' });
});

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
client.on('messageCreate', (message) => {
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
        // Carteira
        case 'carteira':
            message.reply('Não Juca, ainda não está funcionando esse comando...');
            break;
        // Error - comando não conhecido.
        default: message.reply('Opa, não conheço esse comando...');
        break;
    }
});


// Reações e respostas a mensagens sem comandos
client.on('messageCreate', (message) => {
    if (message.author.bot || message.content.includes('@here') || message.content.includes('@everyone')) {
        return;
    }
    else if (message.content.toLowerCase().includes('gostoso')) {
        message.react('❤️');
    }
    else if (message.content.toLowerCase().includes('gostosa')) {
        message.react('✋');
    }
    else if (message.content.toLowerCase().includes('bom dia') || message.content.toLowerCase().includes('oi astro')) {
        const bomDia = require('./jsons/bomDia.json');
        const values = Object.values(bomDia);
        const randomValue = values[parseInt(Math.random() * values.length)];
        message.channel.send(randomValue);
    }
    else if (message.content.toLowerCase().includes('né astro')) {
        const neAstro = require('./jsons/neAstro.json');
        const values = Object.values(neAstro);
        const randomValue = values[parseInt(Math.random() * values.length)];
        message.channel.send(randomValue);
    }
    else if (message.content === message.content.toUpperCase() && message.content.length > 40)
        if (message.content.startsWith('<@') && message.content.endsWith('>')) {
            return;
        }
        else {
            message.channel.send(`${message.member} Pala de glita 😡`);
        }
    else if (message.author.id === '683490663920435226') {
        const tonho = parseInt(Math.random() * 100);
        if (tonho <= 2) {
            message.channel.send('CALAAABOCAAAATONHOOO');
        }
    }
    else if (message.content === '<@!950741775142752306>' && !message.content.startsWith(prefix)) {
        const imagens = require('./jsons/images.json');
        const values = Object.values(imagens);
        const randomValue = values[parseInt(Math.random() * values.length)];
        if (message.author.id === '134687378521456641' || message.author.id === '232248550354845696') {
            const embed = new MessageEmbed()
                .setTitle('Criador, que alegria você por aqui 😍')
                .setColor([45, 25, 52])
                .setImage(randomValue);
            message.reply({ embeds: [embed] });
        }
        else {
            const embed = new MessageEmbed()
                .setTitle(`Oii ${message.author.username} 😬`)
                .setColor([45, 25, 52])
                .setImage(randomValue);
            message.reply({ embeds: [embed] });
        }
    }
    else if (message.content.toLowerCase().includes('su') && (message.content.toLowerCase().includes('lenzi'))) {
        message.react('❤️');
        const sulenzi = new MessageEmbed()
            .setTitle('SU & LENZI?')
            .setColor([45, 25, 52])
            .setDescription('<:lovesu:956897671761780746><:lovexuxu:956897693542789140>')
            .setImage('https://c.tenor.com/St8FpL2GUAUAAAAC/patrick-star-cute.gif')
            .setFooter({ text: 'Que cê tá falando do casal mar fofo do survidor? aaah gut gut' });
        message.reply({ embeds: [sulenzi] });
    }
    else if (message.content.toLowerCase().includes(' muda') || message.content.toLowerCase().includes('muda ')) {
        const muda = parseInt(Math.random() * 10);
        const mudamessage = new MessageEmbed()
            .setTitle('Ouvi MUDA?')
            .setColor([45, 25, 52])
            .setImage('https://c.tenor.com/R5BaBITnM3UAAAAd/giorno-part5.gif')
            .setFooter({ text: 'MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA' });
        if (muda <= 4) {
            message.react('<:su_kekwut:735904285535240323>');
            message.reply({ embeds: [mudamessage] });
        }
    }
    else if (message.content.toLowerCase() === 'defesa') {
        message.delete();
        message.channel.send('Em caso de investigação policial, eu declaro que não tenho envolvimento com este grupo e não sei como estou no mesmo, provavelmente fui inserido por terceiros, declaro que estou disposto a colaborar com as investigações e estou disposto a me apresentar a depoimento se necessário');
    }
    else if (message.content.toLowerCase().includes('carros') && message.content.toLowerCase().includes('rio')) {
        message.channel.send('NINGUÉM É OBRIGADO A GOSTAR DE CARROS OU DE RIO CARA, NA VERDADE, NÃO É OBRIGADO A GOSTAR DE NADA. VAI SE FUDE CARA.');
        message.channel.send('https://c.tenor.com/B9GSTO11naAAAAAM/die-the-imbeciles.gif');
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
    member.roles.add(member.guild.roles.cache.find(role => role.id === '683883629964820595'));
    member.roles.add(member.guild.roles.cache.find(role => role.id === '814614439764033548'));
    member.roles.add(member.guild.roles.cache.find(role => role.id === '815376261056168006'));
    member.roles.add(member.guild.roles.cache.find(role => role.id === '815377284931387464'));
    member.roles.add(member.guild.roles.cache.find(role => role.id === '815376676099850251'));
    member.roles.add(member.guild.roles.cache.find(role => role.id === '813811893457518642'));

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
    canal.send(`<@!${member.user.id}> Saiu do servidor, até mais! Volte sempre... Ou não, sei lá.`);
});

// Auth link: https://discord.com/oauth2/authorize?client_id=950741775142752306&permissions=8&scope=bot