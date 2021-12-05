const mongoose = require('mongoose');
class connection{
    //Construtor
    constructor(){
        this.databaseConnectionMongoDB();
    }

    databaseConnectionMongoDB(){
        this.mongoDBConnection = mongoose.connect("mongodb://localhost/nodejs",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() =>{
            console.log("Conexão estabelecido com o Mongodb");
        }).catch((error) =>{
            console.log(`Erro ao estabelcer conexão com mongodb. Detalhes: ${error}`);
        })
    }
}

module.exports = new connection();