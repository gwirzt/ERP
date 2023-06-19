const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Menu } = require('../../db');



// el menu se maneja con Get, Post, Put y Delete


/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener todos los menús
 *     description: Obtiene todos los menús disponibles
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve la lista de menús.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */


router.get('/', async (req, res) => {
    const menus = await Menu.findAll();
    res.json(menus);
}

);

/**
 * @swagger
 * /alta:
 *   post:
 *     summary: Crear un nuevo menú
 *     description: Crea un nuevo menú con la información proporcionada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuInput'
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve el menú creado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       422:
 *         description: Error de validación. Devuelve los errores de validación encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */

router.post('/', [check('nombre').isString().not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    const menu = await Menu.create(req.body);
    res.json(menu);
}
);

/**
 * @swagger
 * /modificar/{id}:
 *   put:
 *     summary: Modificar un menú existente
 *     description: Modifica un menú existente con la información proporcionada
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del menú a modificar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuInput'
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve el menú modificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       422:
 *         description: Error de validación. Devuelve los errores de validación encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */


router.put('/modificar/:id', [check('nombre').isString().not().isEmpty(),]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const menu = await Menu.findByPk(req.params.id);
        await menu.update(req.body);
        res.json(menu);
    }
);

/**
 * @swagger
 * /borrar/{id}:
 *   delete:
 *     summary: Eliminar un menú
 *     description: Elimina un menú existente según el ID proporcionado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del menú a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve el menú eliminado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 */
router.delete('/borrar/:id', async (req, res) => {
    const menu = await Menu.findByPk(req.params.id);
    await menu.destroy();
    res.json(menu);
}
);



module.exports = router;
