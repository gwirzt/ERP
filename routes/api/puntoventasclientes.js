const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


const { PuntoVentasCliente } = require('../../db.js');
const { PuntoVentasClientePago } = require('../../db.js');

const Usuarios = require('../../models/Usuarios.js');
const jwt = require('jwt-simple');




// Ruta para dar de alta un cliente

/**
 * @swagger
 * /api/puntoventasclientes/alta:
 *   post:
 *     summary: Dar de alta un nuevo cliente del punto de venta
 *     tags:
 *       - Punto de Venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente dado de alta exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       422:
 *         description: Error de validación de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al dar de alta el cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 */
router.post('/alta', [
    check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    check('direccion').notEmpty().withMessage('Debe ser una direccion valida'),
    check('email').isEmail().withMessage('Debe ser un email válido'),
    check('telefono').notEmpty().withMessage('Debe ser un número de teléfono válido')
], async (req, res) => {
    // Verificar si hay errores de validación

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const nuevoCliente = await PuntoVentasCliente.create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            email: req.body.email,
            telefono: req.body.telefono
        });
        // Le agrego un token fijo al cliente
        const payload = { usuarioid: nuevoCliente.id };
        const token = jwt.encode(payload, 'Dime con quien andas y te dire quien eres');
        await nuevoCliente.update({ token: token });

        res.status(201).json({ mensaje: 'Cliente dado de alta exitosamente', nuevoCliente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al dar de alta el cliente' });
    }
});


/**
 * @swagger
 * /api/puntoventasclientes/pagoperiodo:
 *   post:
 *     summary: Crear un nuevo pago de periodo
 *     tags:
 *       - Punto de Venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cliente:
 *                 type: integer
 *               importe_pesos:
 *                 type: number
 *               importe_dolares:
 *                 type: number
 *               fecha_desde:
 *                 type: string
 *                 format: date
 *               fecha_hasta:
 *                 type: string
 *                 format: date
 *               cantidad_licencias:
 *                 type: integer
 *             required:
 *               - id_cliente
 *               - importe_pesos
 *               - importe_dolares
 *               - fecha_desde
 *               - fecha_hasta
 *               - cantidad_licencias
 *     responses:
 *       '201':
 *         description: Pago creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 nuevoPago:
 *                   type: object
 *                   # Agrega aquí la definición del modelo PuntoVentasClientePago
 *       '422':
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ValidationError'
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 * 
 * components:
 *   schemas:
 *     PuntoVentasClientePago:
 *       type: object
 *       properties:
 *         id_cliente:
 *           type: string
 *         fecha_pago:
 *           type: string
 *           format: date-time
 *         importe_pesos:
 *           type: number
 *         importe_dolares:
 *           type: number
 *         fecha_desde:
 *           type: string
 *           format: date
 *         fecha_hasta:
 *           type: string
 *           format: date
 *         cantidad_licencias:
 *           type: integer
 *     ValidationError:
 *       type: object
 *       properties:
 *         value:
 *           type: any
 *         msg:
 *           type: string
 *         param:
 *           type: string
 *         location:
 *           type: string
 */
router.post('/pagoperiodo', [
    check('id_cliente').notEmpty().withMessage('El id del cliente es obligatorio'),
    check('importe_pesos').notEmpty().withMessage('El importe en pesos es obligatorio'),
    check('importe_dolares').notEmpty().withMessage('El importe en dolares es obligatorio'),
    check('fecha_desde').notEmpty().withMessage('La fecha de pago es obligatoria'),
    check('fecha_hasta').notEmpty().withMessage('La fecha de pago es obligatoria'),
    check('cantidad_licencias').notEmpty().withMessage('La cantidad de licencias es obligatoria'),
], async (req, res) => {

    // Verificar si hay errores de validación

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }


    try {
        const nuevoPago = await PuntoVentasClientePago.create({
            id_cliente: req.body.id_cliente,
            fecha_pago: Date.now(),
            importe_pesos: req.body.importe_pesos,
            importe_dolares: req.body.importe_dolares,
            fecha_desde: req.body.fecha_desde,
            fecha_hasta: req.body.fecha_hasta,
            cantidad_licencias: req.body.cantidad_licencias
        });
        res.status(201).json({ mensaje: 'Pago dado de alta exitosamente', nuevoPago });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al dar de alta el pago' });
    }
});

/**
 * @swagger
 * /api/puntoventasclientes/consultarPago:
 *   post:
 *     summary: Consultar pagos de un cliente
 *     tags: 
 *      - Punto de Venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token del cliente
 *             example:
 *               token: "..."
 *     responses:
 *       201:
 *         description: Cliente consultado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 pagos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PuntoVentasClientePago'
 *       422:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al consultar el token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de error
 */

router.post('/consultarPago', [
    check('token').notEmpty().withMessage('Debe enviar un token')
], async (req, res) => {

    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const cliente = await PuntoVentasCliente.findAll({
            where: {
                token: req.body.token
            }
        });
        if (cliente) {

            const pagos = await PuntoVentasClientePago.findAll({
                where: {
                    id_cliente: cliente[0].id
                }
            });
            res.status(201).json({ mensaje: 'Cliente consultado exitosamente', pagos });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al consultar el token ' });
    }

});








module.exports = router;


