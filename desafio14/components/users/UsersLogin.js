const Users = require('./UsersSchema');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const authenticateToken = require('../../utils/authenticateToken');
// const UsersRegistro = require('./UsersRegistro');

module.exports = (app) => {
    app.use('/login', router);

    router.get('/', (req, res) => {
        res.render('login');
    });

    router.post('/', async (req, res, next) => {

        // Buscar el usuaio
        const { email, password } = req.body;

        const users = await Users.findOne({ email });
        if (!users) {
            //Si el usuario no existe
            await res.status(401).json({ mensaje: 'El usuario no existe' });
            next();
        } else {
            //Si el usuario existe, verificar la contraseña
            if (!bcrypt.compareSync(password, users.password)) {
                //Si la contraseña no es correcta
               console.log('contraseña incorrecta');
                return res.render('login-error');
                
                next();
            } else {
                //Si todo es correcto, crear y firmar el JWT
                const token = jwt.sign({
                    //datos con lo que se va a firmar el token
                    email: users.email,
                    usuario: users.nombre,
                    _id: users._id
                },
                    process.env.PRIVATE_KEY,
                    {
                        expiresIn: '1h'
                    });
                //retornar el token
                res.send({
                    users: {
                        email: users.email,
                        usuario: users.nombre,
                        _id: users._id
                    }, token
                });

            }
        }
    })
}

    
