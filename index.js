const express=require('express');
const app = express();
const jwt =require('jsonwebtoken')
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

const auth = require("./middlewares/auth");
/*-------------------------Controllers-------------------------*/
const TypeController = require('./controllers/TypeController');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

/*--------------------------User_roots-------------------------------*/
app.post('/login',SessionController.login);

app.use(auth.authorization);

app.post('/user',UserController.create);
app.get('/user/client',UserController.get);
app.get('/user/employee',UserController.getfunc);

/*-------------------------Type_roots---------------------------------*/
app.post('/type',TypeController.create);
app.get('/type',TypeController.select);

app.listen(PORT,()=> console.log(`Servidor rodando na url:http://localhost:${PORT}`));
