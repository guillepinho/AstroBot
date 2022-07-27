const fs = require('fs');
const https = require('https');

const checkLink = (link) => {
  const result = true;
  try {
    https.get(link, res => {
      if (res.statusCode !== 200) {
        result = false;
      }
    })
  }
  catch (error) {
    console.log(error.message);
  }
  return result;
};

const checkImg = (link) => {
  const check = link.match((/(jpg|jpe?g|png|gif)/g));
  return check.length > 0;
}

module.exports = {
  name: 'add',
  description: 'adicionar aos JSON',
  async execute(message, args) {
    if (!message.member.roles.cache.has('684013101787512883')) {
      message.reply('Hmmm... vi aqui nos meus controles que você não tem esse poder, moço. <:su_panda2:697163015891583076>');
      return;
    }

    const hasTwoArgs = args.length === 2;
    const isImg = checkImg(args[1]);
    const isLink = checkLink(args[1]);

    if (!hasTwoArgs || !isImg || !isLink) {
      message.reply('Xiii... algo deu errado. Cheque: 1. A sintaxe (!add "comando alvo" "gif/foto a adicionar"). 2. A imagem deve ser um link da internet, tá? Terminado em jpg, jpeg, png ou gif! <:su_panda2:697163015891583076>');
      return;
    }

    const comando = args[0];
    const comandos = ['abs', 'otako', 'bj'];
    const imagem = {
      'link': args[1],
    };

    if (!comandos.includes(comando)) {
      message.reply('Opa, não conheço esse comando ou ele não comporta adição de gifs. Verifica se você digitou certinho. Se quiser, digita !ajuda e veja o nome original do comando.');
      return;
    }

    message.delete();
    message.channel.send(`<@${message.author.id}> - Adicionado com sucesso a nova imagem para o comando !${comando}.`);

    setTimeout(() => {
      const arquivoOrig = fs.readFileSync('./jsons/' + comando + '.json');
      const json = JSON.parse(arquivoOrig);
  
      json.push(imagem);
      fs.writeFileSync('./jsons/' + comando + '.json', JSON.stringify(json));
    }, 1000);
  }
};