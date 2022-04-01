const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ajuda',
    description: 'list commands',
    execute(message) {
        const rollEmbed = new MessageEmbed()
        .setColor([45, 25, 52])
        .setTitle('Precisando de ajuda?')
        .setDescription('Bom, meu prefixo é o "**!**" e os meus comandos são esses:')
        .setImage('https://media.giphy.com/media/jUWNrvwR4ezUwJc2Gq/giphy.gif')
        .addFields(
            { name: 'oi', value: 'Saiba mais sobre mim (:' },
            { name: 'ping', value: 'Teste para ver se estou acordado, mas não abusa hein?!' },
            { name: 'criador', value: 'Para saber quem meu deu a "luz"?' },
            { name: 'id', value: 'Para saber sua ID do discord, ou a de outro usuário. Use: !id ou !id @tag.' },
            { name: 'dado', value: 'Quer rolar um dado? Só usar o comando, dizer quantos dados e faces e se há bonificação ou penalização no roll: !dado 1d6 3.' },
            { name: 'dadoDM', value: 'Mesmo que o comando acima, mas mando resultado na sua DM.' },
            { name: 'fala', value: 'Deseja falar algo e tem vergonha? Eu falo por você. Só digitar o que quer depois do comando.' },
            { name: 'abs', value: 'Manda AQUELE abraço!' },
            { name: 'bj', value: 'Manda um beijin molhado!' },
            { name: 'escolhe', value: 'Sortearei entre varios itens para você escolher e tomar as decisões da sua vida. O destino as vezes é sorte :P' },
            { name: 'avatar', value: 'Manda o avatar do usuário tageado, ou manda o seu, em foto, em alta definição, bonito, lindo.' },
            { name: 'lero', value: 'Eu vou impressionar você com um texto sobre qualquer assunto. Sou um gênio.' }
        )
        .setFooter({ text: 'Olá, posso lhe AUjudar?' });

        message.reply({ embeds: [rollEmbed] });
    }
};