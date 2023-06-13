const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Localidad } = require('../../db');


/**
 * @swagger
 * /api/localidad/alta:
 *   post:
 *     summary: Alta de localidad
 *     description: Crea una nueva localidad.
 *     tags:
 *       - Localidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               id_provincia:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Localidad creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Localidad'
 *       '422':
 *         description: Parámetros inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       value:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *
 */

router.post('/alta', [check('nombre').isString().not().isEmpty(),
check('id_provincia').isInt().not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        };
        const localidad = await Localidad.create(req.body);
        res.json(localidad);
    }
);

module.exports = router;


