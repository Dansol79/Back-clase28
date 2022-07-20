const {Router} = require('express');
const router = Router();
const yargs = require('yargs');
const getArguments = require('../../utils/getTerminalArguments');

const data = yargs(process.argv.slice(2)).argv;


const info ={
    argumentosDeEntrada: getArguments(data),
    nombreDeLaPlataforma: process.platform,
    versionNode: process.version,
    rss: process.memoryUsage().rss,
    pathDeEjecucion:process.title,
    processId: process.pid,
    carpetaDelProyecto: process.cwd(),
};

module.exports = (app) => {
    app.use('/info', router);

    router.get('/', (req, res) => {
        res.render('info', {info});
    });
}