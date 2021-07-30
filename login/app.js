const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express;
const encrypt = require('bcrypt');
const user = require('./public/user');

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


// app.length('/', (req, res) => {

// });

app.post('/register', (req, res) => {
    const{name, password} = req.body;
    const user = new user({name, password});
    user.save( error => {
        //validación de agregar el usuario
        if (error){
            res.status(500).send('¡Error al registrar al usuario!')
        }else{
            res.status(200).send('¡El usuario se registró con éxito!')
        }
    })
});

app.pos('/authenticate', (req, res) => {
    const {name, password} = req.body;
    // findOne nos pide un parametro para buscar un callback
    user.findOne({name}, (error, user) => {
        if(error){
            //mensajes de autenticación
            res.status(500).send('Error de autenticación del usuario');
        }else if (!user){
            res.status(500).send('Usuario inexistente');
        }else{
            user.rightPassword(password, (error, result) =>{
                if(error){
                    res.status(500).send('Error de autenticación');
                }else if(result){
                    res.status(200).send('Usuario autenticado con éxito');
                }else{
                    res.status(500).send('Usuario o contraseña incorrectos');
                }
            })
        }
    }) 
});

app.listen(3000, () => {
    console.log('Server started')
});

module.exports = app;