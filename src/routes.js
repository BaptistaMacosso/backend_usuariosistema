const { Router } = require('express');
const UserController = require('./apps/Controllers/UserController');
const LoginController = require('./apps/Controllers/LoginController');
const Middleware = require('./apps/Middlewares/AuthMiddleware');
const routes = new Router();

//Rota base
routes.get("/", (req, res)=>{
    res.send("Bem-Vindo a API de controlo de Usuário");
});
//Login Usuários
routes.post("/login", LoginController.index);

//Adicionar Usuários
routes.post("/user", UserController.store);

//Mostrar Usuários
routes.get("/user", UserController.show);

//Alterar Usuários
routes.patch("/:id", Middleware, UserController.alterar);

//Deletar Usuários
routes.delete("/:id", Middleware, UserController.excluir);

module.exports = routes;