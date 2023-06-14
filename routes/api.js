const router = require('express').Router();
const middlewares = require('./middlewares');


apiProvinciasRouter = require('./api/provincias');
apiLocalidadesRouter = require('./api/localidades');


const apiEmpresasRouter = require('./api/empresas');


const usuariorouter = require('./api/usuarios');
const apiPuntoVentasClientesRouter = require('./api/puntoventasclientes');





router.use('/provincia', middlewares.checkToken, apiProvinciasRouter);
router.use('/localidad', middlewares.checkToken, apiLocalidadesRouter);


router.use('/empresa', middlewares.checkToken, apiEmpresasRouter);
router.use('/usuario', usuariorouter)
router.use('/puntoventascliente', apiPuntoVentasClientesRouter);

router.use('/sequelizepruebas', require('./api/sequelizePruebas'));

module.exports = router;

