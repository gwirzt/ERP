const router = require('express').Router();
const middlewares = require('./middlewares');


apiMenusRouter = require('./api/menus');
apiItemsRouter = require('./api/items');


apiProvinciasRouter = require('./api/provincias');
apiLocalidadesRouter = require('./api/localidades');


const apiEmpresasRouter = require('./api/empresas');


const usuariorouter = require('./api/usuarios');
const apiPuntoVentasClientesRouter = require('./api/puntoventasclientes');



router.use('/menu', middlewares.checkToken, apiMenusRouter);
router.use('/item', middlewares.checkToken, apiItemsRouter);

router.use('/provincia', middlewares.checkToken, apiProvinciasRouter);
router.use('/localidad', middlewares.checkToken, apiLocalidadesRouter);


router.use('/empresa', middlewares.checkToken, apiEmpresasRouter);
router.use('/usuario', usuariorouter)
router.use('/puntoventascliente', apiPuntoVentasClientesRouter);



module.exports = router;

