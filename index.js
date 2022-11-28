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
const ClientController = require('./controllers/ClientController');
const EmployeeController = require('./controllers/EmployeeController'); 
const ServController = require('./controllers/ServController');
const SessionController = require('./controllers/SessionController');
const HourController = require('./controllers/HourController');
const EmployeeMiddlewares = require('./middlewares/EmployeeMiddlewares');
const AgendController  = require('./controllers/AgendController');


/*--------------------------User_routes-------------------------------*/
app.post('/login',SessionController.login);
app.get('/logout',SessionController.logout);

//app.use(auth.authorization);

app.post('/user',UserController.create);
app.get('/user/client',ClientController.get);
app.get('/user/employee',EmployeeController.getfunc);

/*-------------------------Type_routes---------------------------------*/

app.post('/type',TypeController.create);
app.get('/type',TypeController.select);

/*---------------------------Services_routes----------------------------*/

app.post('/service', EmployeeMiddlewares.has_employee_access, ServController.create);
app.get('/service',ServController.get);
app.get('/service/:id',ServController.selectById);
app.put('/service/:id',ServController.update);
app.delete('/service/:id',ServController.delete); 

/*------------------------------Hour_routes------------------------------*/

app.post('/hour',HourController.create);
app.get('/hour',HourController.get);

/*---------------------------------scheduling-----------------------------*/
app.post('/scheduling',AgendController.agendar);
app.get('/scheduling',AgendController.getAgend);

app.listen(PORT,()=> console.log(`Servidor rodando na url:http://localhost:${PORT}`));
