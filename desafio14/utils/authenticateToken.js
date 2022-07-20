const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET =  process.env.PRIVATE_KEY;

// autenticar el token
module.exports = function authenticateToken(req, res, next) {

    const token = req.get('Authorization')
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
             return res.status(401).json({ mensaje: 'Token no válido' });
        }
        res.users = decoded.users;
        next();
    });
}
