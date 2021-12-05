const jwt = require('jsonwebtoken');
const config = require('../../config/auth');
const { promisify } = require('util'); // Nativo do java script:

module.exports = async(req, res, next)=>{
    const auth = req.headers.authorization;

    //Verificar se o token informado está valido:
    if(!auth){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "O token de autorização não existe!"
        });
    }

    const [bearer, token] = auth.split(' '); // Separando o token do auth de retorno:
    try 
    {
        const decoded = await promisify(jwt.verify)(token, config.secret);
        if(!decoded){
            return res.status(401).json({
                error: true,
                code: 130,
                message: "O token está expirado!"
            });
        }else{
            req.user_id = decoded.id;
            next();
        }
    }catch{
        return res.status(401).json({
            error: true,
            code: 130,
            message: "O token é inválido!"
        });
    }
}