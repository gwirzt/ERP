const jwt = require('jwt-simple');
const moment = require('moment');



const checkToken = (req, res, next) => {
    if (!req.headers['user-token']) {
        return res.status(401).json({ error: 'No autorizado, no tiene user token' });
    };
    const userToken = req.headers['user-token'];
    let payload = {};
    try {
        payload = jwt.decode(userToken, 'Dime con quien andas y te dire quien eres');
    } catch (err) {
        return res.status(401).json({ error: 'No autorizado, token incorrecto' });
    };
    if (payload.expiredAt < moment().unix()) {
        return res.status(401).json({ error: 'No autorizado, token expirado' });
    };

    req.usuarioId = payload.usuarioId;

    next();
};

module.exports = { checkToken: checkToken };
