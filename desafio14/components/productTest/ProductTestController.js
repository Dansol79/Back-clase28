const {Router} = require('express');
const router = Router();
const productos = require('../../utils/generarProductos');

module.exports = (app) => {
    app.use('/productos', router);

    router.get('/', (req, res) => {
        res.json(productos);
    })
}