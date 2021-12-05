const User = require('../models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');

class UserController{

    //Método para listar os usuários no sistema:
    async show(req, res){
        var users = await User.find();
        return res.status(200).json({
            error:false,
            users
        })
    }

    //Método para salvar os usuários no sistema:
    async store(req, res){

        /**
         * Validação atraves do YUP Schema
         * Fim
         */
        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email(),
            password: yup.string().required(),
          });

          if(!await schema.isValid(req.body)){
            return res.status(400).json({
                    error:true,
                    message:"Erro: Dados Inválidos..."
            });
          }

          //Desestruturar a requisição.
        const { name, email, password } = req.body; //recebendo as informações no body:
        const data = { name, email, password } //Criando uma constante:
        data.password = await bcrypt.hash(data.password, 16);//Criptografando a minha password:

        await User.create(data,(error)=>{
            //Se erro
            if(error) return res.status(400).json({
                    error:true,
                    message:"Erro ao inserir usuário no mongoDB"
            });
            //Tudo ok
            return res.status(200).json({
                error:false,
                message:"Usuário inserido com sucesso"
            });
        });
    }

    //Método para editar os usuários no sistema:
    async alterar(req, res){
        /**
         * Verificação do usuário se existe.
         */
        const userId = req.params.id;
        const existUser = await User.findOne({_id:userId});
        if(!existUser){
            res.status(422).json({ message:"Usuário não foi encontrado!" });
            return
        }
        //Alterar os dados do usuário selecionado.
        try{
            //Desestruturar a requisição recebida:
            const { name,email,password } = req.body;
            const dados = { name,email,password }; //Criando constante.
            dados.password = await bcrypt.hash(dados.password, 16); //Criptografia da password.
            await User.updateOne({ _id:userId },dados);
            return res.status(200).json({
                error:false,
                message:"Usuário alterado com sucesso"
            });
        }catch{
            res.status(500).json({ 
                error: true,
                message: "Não foi possível alterar usuário!" 
            });
        }
        
    }

    //Método para excluir os usuários no sistema:
    async excluir(req, res){
        const id = req.params.id;
        //Verificar se o registo existe no sistema:
        const UserExcluir = await User.findOne({_id:id});
        if(!UserExcluir){
            res.status(422).json({message:"Usuário não foi encontrado!"});
            return;
        }
        //Tentar apagar o registo encontrado:
        try{
            await User.deleteOne({_id:id});
            res.status(200).json({message:"Usuário removido com sucesso!"});
        }catch{
            res.status(500).json({
                error: true,
                message: "Não foi possível excluir o usuário!"
            });
        }
    }
}
module.exports = new UserController();