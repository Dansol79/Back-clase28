const yargs = require('yargs');


let options = {
    default:{
        port: 8080,
    },
    alias:{
        p: 'port',
    },
}

const yargsObj = yargs(process.argv.slice(2)).default(options.default).alias(options.alias).argv;
module.exports ={ yargsObj};