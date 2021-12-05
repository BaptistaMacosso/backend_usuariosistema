const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('./config/connection');

class APP{

    //Método constructor:
    constructor(){
        this.app = express();
        this.middlewares();
        this.rotas();
    }

    //
    middlewares(){
        this.app.use(express.json());

        this.app.use((req, res, next)=>{
            res.header("Access-Controll-Allow-Origin","*");
            res.header("Access-Controll-Allow-Methods","Get, Put, Post, Delete");
            res.header("Access-Controll-Allow-Headers","Access, Content-type, Authorization, Acept, Origin, X-Requested-With");

            this.app.use(cors());
            next();
        });
    }

    //
    rotas(){
        this.app.use(routes);
    }

}

module.exports = new APP().app;