const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Item } = require('../../db');





router.get('/', async (req, res) => {
    const items = await Item.findAll();
    res.json(items);
}

);


router.post('/', [check('id_menu').isInt().notEmpty(),
check('nombre').isString().not().isEmpty(),
check('accion').isString().not().isEmpty(),],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const nuevoiIem = await Item.create(req.body);
        res.json(nuevoiIem);
    }
);


router.put('/modificar/:id', [check('id_menu').isInt().notEmpty(),
check('nombre').isString().not().isEmpty(),
check('accion').isString().not().isEmpty(),]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const nuevoItem = await Item.findByPk(req.params.id);
        await nuevoItem.update(req.body);
        res.json(nuevoItem);
    }
);

router.delete('/borrar/:id', async (req, res) => {
    const nuevoItem = await Item.findByPk(req.params.id);
    await nuevoItem.destroy();
    res.json(nuevoItem);
}
);



module.exports = router;
