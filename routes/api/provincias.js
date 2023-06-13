const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Provincia, Localidad } = require('../../db');
const Sequelize = require('sequelize');


/**
 * @swagger
 * /api/provincia/alta:
 *   post:
 *     summary: Alta de provincia
 *     description: Crea una nueva provincia.
 *     tags:
 *       - Provincia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Provincia creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provincia'
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
router.post('/alta', [check('nombre').isString().not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        };
        const provincia = await Provincia.create(req.body);
        return res.json(provincia);
    }
);

router.post('/listar', async (req, res) => {
    const provincias = await Provincia.findAll({
        attributes: [
            'id',
            'nombre',
            [Sequelize.fn('COUNT', Sequelize.col('localidades.id')), 'cantidadLocalidades']
        ],
        include: [{
            model: Localidad,
            attributes: []
        }],
        group: ['Provincia.id']
    });
    return res.json(provincias);
});


module.exports = router;
