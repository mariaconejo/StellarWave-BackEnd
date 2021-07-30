// modelo para poder hacer las operaciones
const mongoose = require('mongoose');
const encrypt = require('bcrypt');

//cuantas veces se va a repetir el algoritmo
// para saber cuantas veces se tiene que encriptar
// un numero mayor de 9 significa que la seguridad es mayor
const saltRound = 10;

const userSchema = new mongoose.Schema({
    //nombre de usuario único
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

//pre: hace operaciones antes de que las cosas se guarden en la base de datos
userSchema.pre('save', function(next){
    //podemos validar si new contenido nuevo o modified si el contenido del password está siendo modificado
    if(this.new || this.modified('password')){
        //referencia del this
        const document = this;
        //hash de bcrypt encripta el password | recibe tres parametros:
        // el password, el salround y el callback
        bcrypt.hash(document.password, saltRound, (error, hashPassword) =>{
            //validamos si hay un error y llamamos a next con el error
            if(error){
                // next para que continue el flujo de la función
                next(error);
            }else{
                // guardamos el hash dentro del password
                document.password = hashPassword;
                next();
            }
        });
    } else {
        next();
    }
});
// en resumen esta funcion de arriba nos ayuda a guardar el password

//Esta siguiente funcion nos permite comparar el password que ingresó
// el usuario antes con el password que está ingresando más recientemente
// metodo para saber si password es correcto:
userSchema.methods.rightPassword = function(password, callback){
    //comparar si el parametro password es igual al password q puso el usuario
    bcrypt.compare(password, this.password, function(error, equal){
        if(error){
            callback(error);
        } else {
            callback(error, equal);
        }
    });
}

module.exports = mongoose.model('user', userSchema);