const router = require('express').Router();
const middlewares = require('./middlewares');

const apiEmpresasRouter = require('./api/empresas');
const usuarioouter = require('./api/usuarios');





router.use('/empresas', middlewares.checkToken, apiEmpresasRouter);
router.use('/usuarios', usuarioouter)



module.exports = router;

