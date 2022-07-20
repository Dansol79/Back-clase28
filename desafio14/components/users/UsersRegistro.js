const Users = require('./UsersSchema');
const { Router} = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const isRegistered = require('../../utils/isRegistered');


module.exports = (app) => {
    app.use('/registro', router);

    router.get('/', (req, res) => {
        res.render('registro');
    })

    router.post('/', isRegistered, async (req, res) => {
        const users = new Users(req.body);
        users.password = await bcrypt.hash(req.body.password, 12);
    
        try {
            const newUser = await users.save();
            res.send(newUser); 
    
        } catch (error) {
            console.log(error);
            res.json({ mensaje: 'Hubo un error' });
        }

    })
};
