const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/auth');

class LoginController{

    async index(req,res){
        const {email, password} = req.body;

        //Verificar se este email informado existe:
        const UserExists = await User.findOne({email});
        if(!UserExists){
            return res.status(400).json({
                error: true,
                message:"Usuário não existe!"
            });
        }
        //Verificar a password informada:
        if(!(await bcrypt.compare(password, UserExists.password))){
            return res.status(400).json({
                error: true,
                message:"Password inválida!"
            });
        }

        // Se todo der certo vou retornar estes dados:
        return res.status(200).json({
            User:{
                name: UserExists.name,
                email: UserExists.email
            },
            //Retornar um token de usuário logado:
            token: jwt.sign(
                {id: UserExists._id},
                config.secret,
                {expiresIn: config.expiredIn}
            )
        });
    }

}

module.exports = new LoginController();