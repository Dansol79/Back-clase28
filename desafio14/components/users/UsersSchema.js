const Joi = require('joi');
const { mongodb } = require('../../config/db');
const mongoose = require('mongoose');

mongoose.connect(mongodb.URL, mongodb.options);

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true

    },
    // nombre:{
    //     type: String,
    //     required: 'Agrega tu nombre',

    // },
    password:{
        type: String,
        required: true,
    }
});

// module.exports = mongoose.model('Usuarios', userSchema);

// const email = Joi.string().min(4);
// const password = Joi.string().min(4);
// const token = Joi.string().min(4);

// const userSchema ={
//     email, 
//     password,
//     token
// };

const Users = mongoose.model('users', userSchema);

module.exports = Users;