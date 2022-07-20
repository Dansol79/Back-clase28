const {Router} = require('express');
const router = new Router();

const {fork} = require('child_process');
const childProcess = fork('./components/api-randoms/childProcess.js');

module.exports = (app) => {
    app.use('/api/randoms', router);

    router.get('/', (req, res) => {
        let cant = req.query.cant || 100000000;
        childProcess.send(cant);
        childProcess.on('message', (msj) => {
            res.send(msj.res)
        })
    });
}