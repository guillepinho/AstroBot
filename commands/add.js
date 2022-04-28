const fs = require('fs');
const https = require('https');


module.exports = {
    name: 'add',
    description: 'adicionar aos JSON',
    execute(message, args) {
        if (!message.member.roles.cache.has('684013101787512883')) {
           message.reply('Hmmm... vi aqui nos meus controles que você não tem esse poder, moço. <:su_panda2:697163015891583076>');
           return;
        }

        const comando = args[0];
        const comandos = ['abs', 'otako', 'bj'];
        const imagem = {
            'link': args[1],
        };

        if (!comando || !args[1]) {
            message.reply('Xiii... sintaxe errada. Vamos lá, o certo é: !add "comando alvo" "gif/foto a adicionar". Lembre-se, o gif/foto deve ser um link, tá? O link da imagem e não do site, boco! <:su_panda2:697163015891583076>');
            return;
        }

        if (!comandos.includes(comando)) {
            message.reply('Opa, não conheço esse comando ou ele não comporta adição de gifs. Verifica se você digitou certinho. Se quiser, digita !ajuda e veja o nome original do comando.');
            return;
        }

        const arquivoOrig = fs.readFileSync('./jsons/' + comando + '.json');
        const json = JSON.parse(arquivoOrig);

        if (args[1]) {
            https.get(args[1], res => {
                if (res.statusCode !== 200) {
                    message.reply('Ei, tem certeza que isso é um link? Confirma ai!');
                    return;
                }
            });
        }

        if (!args[1].match((/(jpg|jpe?g|png|gif)/i))) {
            message.reply('Ei, esse link é mesmo de uma imagem? Confirma ai!');
            return;
        }

        json.push(imagem);
        fs.writeFileSync('./jsons/' + comando + '.json', JSON.stringify(json));
        message.reply(`Adicionado com sucesso a nova imagem para o comando !${comando}.`);
    }
};