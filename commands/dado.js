const { MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');
const { registerFont } = require('canvas');

module.exports = {
    name: 'dado',
    description: 'this is the dice command!',
    async execute(message, args) {

        if (!args[0]) {
            message.reply('ô... cê é tonto? quantos dados? quantos lados? Eu hein... acerta a sintaxe fazeno favo.');
            return;
        }

        registerFont('./pictures/font.ttf', { family: 'Mario' });

        const roll = args[0];
        const qtdDadosELados = roll.split('d');
        let dados = qtdDadosELados[0];
        const lados = qtdDadosELados[1];
        const penBon = ~~args[1];
        const resultadoDados = [];
        let resultadoAntesPenBon = 0;
        let resultadoFinal = 0;

        if (lados === 0 || lados === '') {
            message.reply('ô... cê é tonto? quantos dados? quantos lados? Eu hein... acerta a sintaxe fazeno favo.');
            return;
        }

        let imagemDeDado = false;
        let dadoPath = './pictures/empty.png';

        penBon === '' ? 0 : penBon;

        let cadaDado = 0;

        if (dados === '') {
            dados = 1;
            cadaDado = (Math.floor(Math.random() * lados) + 1);
            resultadoAntesPenBon = cadaDado;
            resultadoDados.push(resultadoAntesPenBon);
            resultadoFinal = resultadoAntesPenBon + penBon;
        }
        else if (dados >= 1) {
            for (var i = 0; i < dados; i++) {
                cadaDado = (Math.floor(Math.random() * lados) + 1);
                resultadoDados.push(cadaDado);
            }
            for (var j = 0; j < resultadoDados.length; j++) {
                resultadoAntesPenBon += resultadoDados[j];
            }
            resultadoFinal = resultadoAntesPenBon + penBon;
        }
        else if (resultadoFinal === 0 && penBon === 0 && resultadoAntesPenBon === 0) {
            message.reply('Ô queridão... então, tem alguma coisa errada aí tá? A sintaxe desse comando é a seguinte: "quantidade de dados" d "quantidade de lados", seguido de um espaço, e aí você me informa se tem ou não penalização (ex: -2) ou bonificação (ex: 6). Ah, também funciono se você escrever apenas "d20", por exemplo, vou entender que não há bonificação e que a quantidade de dados será 1.');
            return;
        }

        if (resultadoFinal != 0 && resultadoAntesPenBon != 0) {

            // Criando a imagem no Canvas
            if (lados === '2' || lados === '4' || lados === '6' || lados === '8' || lados === '10' || lados === '12' || lados === '20') {
                imagemDeDado = true;
                dadoPath = './pictures/d' + lados + '.png';
            }

            const canvas = Canvas.createCanvas(50, 50);
            const ctx = canvas.getContext('2d');
            const dadoImg = await Canvas.loadImage(dadoPath);
            let num = cadaDado;
            const attachmentArray = [];

            for (var t = 0; t < resultadoDados.length; t++) {
                num = resultadoDados[t];
                ctx.drawImage(dadoImg, 0, 0);
                ctx.textAlign = 'center';
                // Fonte de acordo com o dado
                if (lados === '4') {
                    ctx.fillStyle = '#000000';
                    ctx.font = '30px "Mario"';
                    ctx.fillText(num, 24, 40);
                }
                else if (lados === '6' || lados === '2') {
                    ctx.fillStyle = '#000000';
                    ctx.font = '40px "Mario"';
                    ctx.fillText(num, 24, 39);
                }
                else if (lados === '8') {
                    ctx.fillStyle = '#000000';
                    ctx.font = '32px "Mario"';
                    ctx.fillText(num, 26, 35);
                }
                else if (lados === '10' || lados === '12') {
                    ctx.fillStyle = '#000000';
                    ctx.font = '28px "Mario"';
                    ctx.fillText(num, 26, 33);
                }
                else if (lados === '20') {
                    ctx.fillStyle = '#000000';
                    ctx.font = '24px "Mario"';
                    ctx.fillText(num, 26, 33);
                }

                const attachment = new MessageAttachment(canvas.toBuffer(), 'resultado' + t + '.png');
                attachmentArray.push(attachment);
            }

            // Criando a mensagem de resultado
            const rollEmbed = new MessageEmbed()
                .setColor([45, 25, 52])
                .setTitle(`Dado de ${message.author.username}`)
                .setDescription(`Gerando um roll de ${roll}, com penalidade/bônus de ${penBon}.`)
                .addFields(
                    { name: '__Resultado Final__:', value: `${resultadoFinal}` },
                    { name: 'Resultado Dados:', value: `[${resultadoDados.join(', ')}]`, inline: true },
                    { name: 'Soma dos Dados:', value: `${resultadoAntesPenBon}`, inline: true },
                    { name: 'Pen/Bon:', value: `${penBon}`, inline: true });

            // Se tiver imagem, gera resultado com. Se não, gera sem.
            if (dados !== 1) {
                if (imagemDeDado === true) {
                    message.channel.send('_rolando o dado..._')
                        .then(msg => { setTimeout(() => msg.delete(), 2000); })
                        .then(
                            setTimeout(function() {
                                message.reply({ embeds: [rollEmbed] });
                                message.channel.send({ files: attachmentArray });
                            }, 2000));
                }
                else {
                    message.channel.send('_rolando o dado..._')
                        .then(msg => { setTimeout(() => msg.delete(), 2000); })
                        .then(
                            setTimeout(function() {
                                message.reply({ embeds: [rollEmbed] });
                            }, 2000));
                }
            }
            else {
                const attachment = new MessageAttachment(canvas.toBuffer(), 'resultado' + i + '.png');
                message.channel.send('_rolando o dado..._')
                    .then(msg => { setTimeout(() => msg.delete(), 2000); })
                    .then(
                        setTimeout(function() {
                            message.reply({ embeds: [rollEmbed], files: [attachment] });
                        }, 2000));
            }
        }
    }
};