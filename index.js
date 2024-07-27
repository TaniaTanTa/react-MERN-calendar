const express=require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
var cors = require('cors')
const path=require('path')
// console.log(process.env);



//crear el servidor de express
const app=express();
//base de datos
dbConnection();
//cors
app.use(cors())
 


//directorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//rutas
//todo:atuh,creewar,login.,renw
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));
//todo:crud eventos
app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})




//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
});