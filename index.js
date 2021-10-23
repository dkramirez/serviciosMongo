const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');


//crear seridor express
const app = express();

//base de datos
dbConnection()

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());

//directorio publico
app.use(express.static('public'));


//rutas
app.use('/api/candidatos', require('./routes/candidatos'));

//escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriento en puerto ${process.env.PORT}`)
})
