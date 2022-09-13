const firebase = require('firebase');

module.exports = {
  name: 'carteira',
  description: '$$',
  async execute(message) {
    const user = message.author.id;
    const database = firebase.database();
    database.goOnline();
    try {
      const request = await database.ref().child("carteira").child(user).get();
      if (request.exists()) {
        const { money } = request.val()
        message.reply(`<@!${user}>, você possui ${money} SUCOINS na sua carteira!`)
      }
    }
    catch (e) {
      message.reply(`Veja bem... deu um problema aqui, manda essa mensagem pro dev: ${e.message}`);
    }
    database.goOffline();
  }
}
