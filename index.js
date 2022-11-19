const express=require('express');
const app = express();
const env = require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());

/*-------------------------Controllers-------------------------*/
const TypeController = require('./controllers/TypeController');
const UserController = require('./controllers/UserController');


/*--------------------------User--------------------------------*/
app.post('/user',UserController.create);
app.get('/user',UserController.get);

/*-------------------------Type---------------------------------*/
app.post('/type',TypeController.create);
app.get('/type',TypeController.select);

app.listen(PORT,()=> console.log(`Servidor rodando na url:http://localhost:${PORT}`));
