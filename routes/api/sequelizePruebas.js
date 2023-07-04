const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Provincia, Localidad, Sequelize } = require('../../db');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');


router.post('/listar', async (req, res) => {




    const provincias = await Provincia.findAll({
        attributes: ['id', 'nombre'], // Especifica las columnas que deseas seleccionar
    });
    return res.json(provincias);
}
);


router.post('/buscagrega',
    [check('nombre', 'El nombre es obligatorio').not().isEmpty(),],

    async (req, res) => {
        const [provincia, created] = await Provincia.findOrCreate({

            where: { nombre: req.body.nombre },

        });
        console.log(created);
        return res.json(provincia);
    }
);

router.post('/findandcountall', async (req, res) => {
    const { count, rows } = await Provincia.findAndCountAll({
        attributes: ['id', 'nombre'],
        // raw: true, // Si es true, solo trae los datos originales de la tabla
        where: { nombre: { [Op.like]: '%' + req.body.nombre + '%' } },
        // offset: 0,
        // limit: 1,
    });
    console.log(count);
    return res.json(rows);
});


router.post('/enviosql', [check('consulta').isString().notEmpty()], async (req, res) => {
    // Envio una consulta SQL y la ejecuta
    //no pude ejecutar un insert con sequelize.query
    const cCadena = req.body.consulta;
    const provincias = await Provincia.sequelize.query(cCadena, {
        type: QueryTypes.SELECT,
    });
    return res.json(provincias);
});






module.exports = router;

