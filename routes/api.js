const router = require('express').Router();
const middlewares = require('./middlewares');

const apiEmpresasRouter = require('./api/empresas');
const usuarioouter = require('./api/usuarios');
const apiPuntoVentasClientesRouter = require('./api/puntoventasclientes');






router.use('/empresas', middlewares.checkToken, apiEmpresasRouter);
router.use('/usuarios', usuarioouter)
router.use('/puntoventasclientes', apiPuntoVentasClientesRouter);


module.exports = router;

