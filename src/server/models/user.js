// modelo del Usuario en la base de datos

const  mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'); // para cifrar la contraseña

const userSchema = new mongoose.Schema({
    local: {
        userAdmin: Boolean,
        userDoctor: Boolean,
        userPatiente: Boolean,
        email: String,
        password: String,
        name: String,
        lastName: String,
        idNumber: Number,
        numContact: Number,
        especiality: String,
        birthDate: Date,
        address: String,
        sex: String ,
        consulMotivation: String
    },

});

//guardar los datos, generar una clave y guardarla, cifrar la contraseña para poder guardarla 
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    
};

//transformarla para compararla con la que esta en la base de datos 
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema );
