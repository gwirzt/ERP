
const Sequelize = require('sequelize');
require('dotenv').config();

// Conecto Seuelize con la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_ADDRESS,
    dialect: 'mysql'
});


// Empresa
const EmpresaMoldel = require('./models/Empresas');
const UnidadNegocioModel = require('./models/UnidadesNegocios');
const LocalidadModel = require('./models/Localidades');
const ProvinciaModel = require('./models/Provincias');

const Empresa = EmpresaMoldel(sequelize, Sequelize);
const UnidadNegocio = UnidadNegocioModel(sequelize, Sequelize);
const Localidad = LocalidadModel(sequelize, Sequelize);
const Provincia = ProvinciaModel(sequelize, Sequelize);

// Empleados
const EmpleadoModel = require('./models/Empleados/Empleado');
const Empleado = EmpleadoModel(sequelize, Sequelize);
const EmpresaArtModel = require('./models/Empleados/EmpresaArt');
const EmpresaArt = EmpresaArtModel(sequelize, Sequelize);
const EmpresaMedicinaLaboralModel = require('./models/Empleados/EmpresaMedicinalaboral');
const EmpresaMedicinaLaboral = EmpresaMedicinaLaboralModel(sequelize, Sequelize);



// Menu
const MenuModel = require('./models/menu/Menu');
const ItemModel = require('./models/menu/Item');
const AccesosModel = require('./models/menu/Acceso');

const UsuarioModel = require('./models/Usuarios');

const Menu = MenuModel(sequelize, Sequelize);
const Item = ItemModel(sequelize, Sequelize);
const Accesos = AccesosModel(sequelize, Sequelize);
const Usuario = UsuarioModel(sequelize, Sequelize);


//Compra Venta
const ClientesModel = require('./models/CompraVenta/Clientes');
const ProveedoresModel = require('./models/CompraVenta/Provedores');
const CondicionPagoModel = require('./models/CompraVenta/CondicionesPagos');
const CondicionIvaModel = require('./models/CompraVenta/CondicionesIva');
const ComprobantesCompraModel = require('./models/CompraVenta/ComprobantesCompra');
const TipoComprobantesModel = require('./models/CompraVenta/TipoComprobantes');
const Cliente = ClientesModel(sequelize, Sequelize);
const Provedor = ProveedoresModel(sequelize, Sequelize);
const CondicionPago = CondicionPagoModel(sequelize, Sequelize);
const CondicionIva = CondicionIvaModel(sequelize, Sequelize);
const ComprobantesCompras = ComprobantesCompraModel(sequelize, Sequelize);
const TipoComprobantes = TipoComprobantesModel(sequelize, Sequelize);



// Punto de Venta
const PuntoVentaClientesModel = require('./models/puntodeventa/PuntoVentasClientes');
const PuntoVentaClientesPagosModel = require('./models/puntodeventa/PuntoVentasClientesPagos');

const PuntoVentasCliente = PuntoVentaClientesModel(sequelize, Sequelize);
const PuntoVentasClientePago = PuntoVentaClientesPagosModel(sequelize, Sequelize);


const syncTablesForceTrue = async () => {
    try {
        await Menu.sync({ force: true, logging: false });
        await Item.sync({ force: true, logging: false });
        await Accesos.sync({ force: true, logging: false });
        await Empresa.sync({ force: true, logging: false });
        await UnidadNegocio.sync({ force: true, logging: false });
        await Localidad.sync({ force: true, logging: false });
        await Provincia.sync({ force: true, logging: false });
        await Cliente.sync({ force: true, logging: false });
        await Provedor.sync({ force: true, logging: false });
        await CondicionPago.sync({ force: true, logging: false });
        await CondicionIva.sync({ force: true, logging: false });
        await ComprobantesCompras.sync({ force: true, logging: false });
        await TipoComprobantes.sync({ force: true, logging: false });
        await PuntoVentasCliente.sync({ force: true, logging: false });
        await PuntoVentasClientePago.sync({ force: true, logging: false });

        // Sincroniza las tablas que deseas con force: true
        console.log('Tablas sincronizadas con force: true');
    } catch (error) {
        console.error('Error al sincronizar tablas con force: true:', error);
    }
};

const syncTablesForceFalse = async () => {
    try {
        await Usuario.sync({ force: false, logging: false });
        await Empleado.sync({ force: false, logging: false });
        // Sincroniza las tablas que deseas con force: false
        console.log('Tablas sincronizadas con force: false');
    } catch (error) {
        console.error('Error al sincronizar tablas con force: false:', error);
    }
};

const syncAllTables = async () => {
    await syncTablesForceTrue();
    await syncTablesForceFalse();
    // llamo ahora al archivo asi¿ociaciones
    require('./models/Asociasiones');
};



sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
        return syncAllTables(); // Llama a la función que sincroniza las tablas
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });


module.exports = {
    sequelize,
    Empresa, UnidadNegocio, Localidad, Provincia, Menu, Item, Accesos, Usuario, Cliente,
    Provedor, CondicionPago, CondicionIva, ComprobantesCompras, TipoComprobantes, PuntoVentasCliente,
    PuntoVentasClientePago
}



