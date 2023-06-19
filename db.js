
const Sequelize = require('sequelize');
require('dotenv').config();


const UsuarioModel = require('./models/Usuarios');
// base
const EmpresaMoldel = require('./models/Empresas');
const UnidadNegocioModel = require('./models/UnidadesNegocios');
const LocalidadModel = require('./models/Localidades');
const ProvinciaModel = require('./models/Provincias');

// Menu

const MenuModel = require('./models/menu/Menu');
const ItemModel = require('./models/menu/Item');
const SubitemModel = require('./models/menu/Subitem');

const AccesosModel = require('./models/menu/Accesos');



//Compra Venta
const ClientesModel = require('./models/CompraVenta/Clientes');
const ProveedoresModel = require('./models/CompraVenta/Provedores');
const CondicionPagoModel = require('./models/CompraVenta/CondicionesPagos');
const CondicionIvaModel = require('./models/CompraVenta/CondicionesIva');
const ComprobantesCompraModel = require('./models/CompraVenta/ComprobantesCompra');
const TipoComprobantesModel = require('./models/CompraVenta/TipoComprobantes');


// Camiones
const ChoferesModel = require('./models/camiones/Choferes');
const TiposVehiculosModel = require('./models/camiones/TiposVehiculos');
const VehiculosModel = require('./models/camiones/Vehiculos');
const EquiposModel = require('./models/camiones/Equipos');

// Punto de Venta
const PuntoVentaClientesModel = require('./models/puntodeventa/PuntoVentasClientes');
const PuntoVentaClientesPagosModel = require('./models/puntodeventa/PuntoVentasClientesPagos');



const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_ADDRESS,
    dialect: 'mysql'
});

const Usuario = UsuarioModel(sequelize, Sequelize);

const Empresa = EmpresaMoldel(sequelize, Sequelize);
const UnidadNegocio = UnidadNegocioModel(sequelize, Sequelize);
const Localidad = LocalidadModel(sequelize, Sequelize);
const Provincia = ProvinciaModel(sequelize, Sequelize);


const Menu = MenuModel(sequelize, Sequelize);
const Item = ItemModel(sequelize, Sequelize);
const Subitem = SubitemModel(sequelize, Sequelize);
const Accesos = AccesosModel(sequelize, Sequelize);


const Cliente = ClientesModel(sequelize, Sequelize);
const Provedor = ProveedoresModel(sequelize, Sequelize);
const CondicionPago = CondicionPagoModel(sequelize, Sequelize);
const CondicionIva = CondicionIvaModel(sequelize, Sequelize);
const ComprobantesCompras = ComprobantesCompraModel(sequelize, Sequelize);
const TipoComprobantes = TipoComprobantesModel(sequelize, Sequelize);


const Choferes = ChoferesModel(sequelize, Sequelize);
const TiposVehiculos = TiposVehiculosModel(sequelize, Sequelize);
const Vehiculos = VehiculosModel(sequelize, Sequelize);
const Equipos = EquiposModel(sequelize, Sequelize);

const PuntoVentasCliente = PuntoVentaClientesModel(sequelize, Sequelize);
const PuntoVentasClientePago = PuntoVentaClientesPagosModel(sequelize, Sequelize);



sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas sincronizadas');
    });

module.exports = {
    Usuario,
    Empresa, UnidadNegocio, Localidad, Provincia, Menu, Item, Subitem, Accesos,
    Cliente, Provedor, CondicionPago, CondicionIva, Choferes,
    TiposVehiculos, Vehiculos, Equipos, ComprobantesCompras, TipoComprobantes, PuntoVentasCliente, PuntoVentasClientePago
}



