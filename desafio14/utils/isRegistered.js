const UsersRegistro = require('../components/users/UsersRegistro');
const Users = require('../components/users/UsersSchema');


module.exports = async function isRegistered(req, res, next){
    const {email, password} = req.body;
    const exists = await Users.find({email: email, password: password});
    if(exists.length){
        res.render('registro-UsuarioRegistrado');
        return;
    }
    next();
}