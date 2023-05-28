const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { Usuario } = require('../../db.js');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');



router.post('/register', [
    check('email', 'Debe ser un email correcto').isEmail(),
    check('password', 'Minimo 5 caracteres').isLength({ min: 5 }),
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
],
    async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        };


        req.body.password = bcrypt.hashSync(req.body.password, 10);

        const Usuario = await Usuario.create(req.body);
        res.json(Usuario);
    });




router.post('/login', async (req, res) => {
    const existeUsuario = await Usuario.findOne({ where: { email: req.body.email } });

    if (existeUsuario) {

        const validPassword = bcrypt.compareSync(req.body.password, existeUsuario.password);
        console.log(validPassword);
        if (validPassword) {
            res.json({ success: true, token: createToken(Usuario) });


        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});


const createToken = (Usuario) => {
    const payload = {
        usuarioid: Usuario.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(15, 'minutes').unix()
    };

    return jwt.encode(payload, 'Frase Secreta');

};

module.exports = router;

