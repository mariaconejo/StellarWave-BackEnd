const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express;
const encrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false }));
app.use(express.static(path.join(_dirname, 'public')));
//url de mi base de datos de mongo db:
const mongoURL = '';
//validamos la conexión
mongoose.connect(mongoURL, function(error){
    // señala un bloque de instrucciones a intentar (try)
    // especifica una respuesta si se produce una excepción (catch)
    if(error){
        // (throw) lanza una excepcion definida por el usuario.
        throw error;
    }else {
        console.log(`Successfully connected to ${mongoURL}`);
    }
});


app.length('/', (req, res) => {

});
