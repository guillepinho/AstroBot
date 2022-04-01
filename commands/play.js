const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'play',
    description: 'joins and plays video from youtube',
    async execute(message, args, client) {
        const song = args;
        console.log(song);
        const voiceChannel = message.member.voice.channel;

        if (args.length === 0) {
            message.reply('Eu poderia até tocar minha viola para você, __mas se você não me diz a música que devo tocar__, como vou saber qual tocar, tonto?');
            return;
        }
        else if (!voiceChannel) {
            message.reply('Eu poderia até tocar minha viola para você, __mas se você não está em um canal de voz__, como cê vai me ouvir?');
            return;
        }
        else if (voiceChannel) {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            const queue = await client.player.createQueue(message.guild);
            if (!queue.connection) {
                await queue.connect(connection);
            }

            const result = await client.player.search(song, {
                requestedBy: message.user,
                searchEngine: QueryType.AUTO
            });

            if (result.tracks.length === 0) {
                message.reply('Ixe, não encontrei essa música não, mandei no CifraClub e tudo... tem como eu tocar essa música se ela não existe?');
                return;
            }

            const letsPlay = result.tracks[0];
            await queue.addTrack(letsPlay);

            const addPlaylist = new MessageEmbed()
            .setColor([45, 25, 52])
            .setTitle(`Opa, moedinha de ${message.author.username} no Jukebox! 🎶`)
            .setDescription(`Daqui a pouquinho, tocando na rádio que toca o seu coração: ***${letsPlay.title}***.`)
            .setThumbnail('https://i.imgur.com/9GtRAO9.jpg')
            .setFooter({ text: `Duração da música: ${letsPlay.duration}.` });

            if (!queue.playing) await queue.play();
            await message.reply({ embeds: [addPlaylist] });
        }
    }
};