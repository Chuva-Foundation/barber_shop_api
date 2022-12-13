const express=require('express');
const app = express();
const jwt =require('jsonwebtoken')
require('dotenv').config();
/*----------------------------controllers----------------------------------*/ 
const UserC =  require('./controllers/UserC');
const Session = require('./controllers/SessionC');
const ServicesC = require('./controllers/ServicesC');
/*----------------------------Middlewares-----------------------------------*/
const EmailExist = require('./middlewares/CheckEmailMiddleware');
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const CheckEmployeeMiddleware = require('./middlewares/CheckEmployeeMiddleware');
/*--------------------------------------------------------------------------*/

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/user/regist',EmailExist.email_exist,UserC.regist);
app.post('/user/login',Session.login);

app.get('/user',AuthMiddleware,UserC.getusers);
app.get('/user/email',UserC.getemail);

app.get('/services',AuthMiddleware,CheckEmployeeMiddleware.has_employee_access,ServicesC.getallservices);
app.post('/create/services',AuthMiddleware,CheckEmployeeMiddleware.has_employee_access,ServicesC.createservices);

app.listen(PORT,()=> console.log(`Servidor rodando na url:http://localhost:${PORT}`));
