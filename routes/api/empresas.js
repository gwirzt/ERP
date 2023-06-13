const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Empresa } = require('../../db');
/**
 * @swagger
 * /api/empresa/alta:
 *   post:
 *     summary: Alta de empresa
 *     description: Crea una nueva empresa.
 *     tags:
 *       - Empresa
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
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               cuit:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Empresa creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       '400':
 *         description: Ya existe una empresa con ese CUIT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
router.post('/alta', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('cuit', 'El cuit es obligatorio').not().isEmpty(),]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() })
        }
        const empresa = await Empresa.findOne({ where: { cuit: req.body.cuit } });
        if (empresa) {
            return res.status(400).send({ message: 'Ya existe una empresa con ese CUIT' });
        }
        const newEmpresa = await Empresa.create(req.body);
        res.json(newEmpresa);
    }
);

module.exports = router;
