const { Router } = require('express');
const router = Router();

module.exports = (app) => {
    app.use('/login', router);

    router.get('/', (req, res) => {
        res.render('login');
    });

    router.post('/', (req, res) => {
        const name = req.body.name;
        if(!name || !name.length){
            res.status(401).json({error: 'Nose envio el nombre para el login'});
            return;
        }
        req.session.name = name;
        res.redirect('/');
    });
}