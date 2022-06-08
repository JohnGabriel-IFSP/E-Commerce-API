const mongoose = require("mongoose");

class Connection {
  constructor() {
    this.connectionMongoDB();
  }

  connectionMongoDB() {
    this.mongoDBConnection = mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("Conectado ao MongoDB");
      })
      .catch((e) => {
        console.log(`Erro ao conectar ao MongoDB, erro: ${e}`);
      });
  }
}

module.exports = new Connection();
