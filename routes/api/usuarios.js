const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { Usuario, Menu, Item, Accesos } = require('../../db.js');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');



/**
 * @swagger
 * components:
 *  schemas:
 *     Usuarios:
 *      type: object
 *      properties:
 *          id:
 *              type: integer       
 *              readOnly: true
 *          username:
 *              type: string
 *          email:
 *              type: string
 *          password:
 *              type: string
 *      required:
 *          - username
 *          - email
 *          - password
 * 
 */

/**
 * @swagger
 * /api/usuario/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuario]
 *     description: Registrar un nuevo usuario con su correo electrónico, contraseña y nombre de usuario.
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: Correo electrónico del usuario.
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Contraseña del usuario (mínimo 5 caracteres).
 *         required: true
 *         type: string
 *       - name: username
 *         in: formData
 *         description: Nombre de usuario.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente.
 *       422:
 *         description: Error de validación. Devuelve una lista de errores de validación.
 *       500:
 *         description: Error en el servidor.
 */
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

        const nuevoUsuario = await Usuario.create(req.body);
        res.json(nuevoUsuario);
    });

/**
 * @swagger
 * /api/usuario/change-password:
 *   post:
 *     summary: Cambiar la contraseña de un usuario
 *     tags: [Usuario]
 *     description: Cambiar la contraseña de un usuario existente mediante su correo electrónico.
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: Correo electrónico del usuario.
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Nueva contraseña del usuario (mínimo 5 caracteres).
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Contraseña cambiada correctamente.
 *       404:
 *         description: Usuario no encontrado.
 *       422:
 *         description: Error de validación. Devuelve una lista de errores de validación.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/change-password', [
    check('email', 'Debe ser un email correcto').isEmail(),
    check('password', 'Minimo 5 caracteres').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Generar el hash de la nueva contraseña
        const newPasswordHash = bcrypt.hashSync(password, 10);

        // Actualizar la contraseña del usuario en la base de datos
        usuario.password = newPasswordHash;
        await usuario.save();

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});




/**
 * Inicia sesión de un usuario.
 * @swagger
 * /api/usuario/login:
 *   post:
 *     summary: Iniciar sesión de usuario.
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Token de autenticación si las credenciales son válidas.
 *       401:
 *         description: Credenciales incorrectas.
 *       404:
 *         description: Usuario no encontrado.
 */

router.post('/login', async (req, res) => {
    const existeUsuario = await Usuario.findOne({ where: { email: req.body.email } });

    if (existeUsuario) {

        const validPassword = bcrypt.compareSync(req.body.password, existeUsuario.password);
        console.log(validPassword);
        if (validPassword) {

            res.json({ success: true, token: createToken(existeUsuario.id) });


        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});


/**
 * @swagger
 * /api/usuario/loginEterno:
 *   post:
 *     summary: Iniciar sesión con token eterno
 *     tags: [Usuario]
 *     description: Iniciar sesión de un usuario existente mediante su correo electrónico y contraseña. Genera un token JWT sin fecha de caducidad.
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: Correo electrónico del usuario.
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: Contraseña del usuario.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Devuelve el token JWT sin fecha de caducidad.
 *       401:
 *         description: Credenciales incorrectas. El correo electrónico o la contraseña son incorrectos.
 *       404:
 *         description: Usuario no encontrado. No existe un usuario con el correo electrónico proporcionado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/loginEterno', async (req, res) => {
    const existeUsuario = await Usuario.findOne({ where: { email: req.body.email } });

    if (existeUsuario) {

        const validPassword = bcrypt.compareSync(req.body.password, existeUsuario.password);
        console.log(validPassword);
        if (validPassword) {
            res.json({ success: true, token: generateTokenEterno(Usuario) });


        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});


const createToken = (nUsuario) => {
    // al crear el token, le pasamos un payload, que es un objeto con los datos que queremos que lleve el token
    // el menu y los items por ejemplo 

    const payload = {
        usuarioid: nUsuario,
        createdAt: moment().unix(),
        expiredAt: moment().add(24, 'hours').unix(),
        // menu: obtenerMenu(nUsuario)
    };
    // la frase de seguridad viene del .ENV
    const token = jwt.encode(payload, process.env.FRASE_LOCA);


    return token

};







module.exports = router;

