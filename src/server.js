require("dotenv").config();
const app = require('./app');
var PORT = process.env.PORT || 5000; // Funciona tanto para produção como desenvolvimento.

app.listen(PORT, ()=>{
    console.log(`APP Ouvindo a porta: ${PORT}`);
})