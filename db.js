
const Sequelize = require('sequelize');
require('dotenv').config();

// Conecto Seuelize con la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_ADDRESS,
    dialect: 'mysql',
    define: { underscored: true, timestamps: false, paranoid: false, freezeTableName: true, },
    logging: console.log,
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

Menu.hasMany(Item, { foreignKey: 'id_menu', foreignKeyConstraint: true, name: 'Menu_Items' });
Item.belongsTo(Menu, { foreignKey: 'id_menu', foreignKeyConstraint: true, name: 'Items_Menu' });

Usuario.hasMany(Accesos, { foreignKey: 'id_usuario', foreignKeyConstraint: true, name: 'Usuario_Accesos' });
Accesos.belongsTo(Usuario, { foreignKey: 'id_usuario', foreignKeyConstraint: true, name: 'Accesos_Usuario' });

Menu.hasMany(Accesos, { foreignKey: 'id_menu', foreignKeyConstraint: true, name: 'Menu_Accesos' });
Accesos.belongsTo(Menu, { foreignKey: 'id_menu', foreignKeyConstraint: true, name: 'Accesos_Menu' });



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


// claves foraneas
//usuarios y Menu
Usuario.hasMany(Menu, { foreignKey: 'id_usuario', foreignKeyConstraint: true, name: 'Usuario_Menu' });
Menu.belongsTo(Usuario, { foreignKey: 'id_usuario', foreignKeyConstraint: true, name: 'Menu_Usuario' });

//usuarios y Accesos
Usuario.hasMany(Accesos, { foreignKey: 'id_usuario', foreignKeyConstraint: true, name: 'Usuario_Accesos' });
Accesos.belongsTo(Usuario, { foreignKey: 'id_usuario', foreignKeyConstraint: true, name: 'Accesos_Usuario' });

//Menu y Accesos
Menu.hasMany(Accesos, { foreignKey: 'id_menu', foreignKeyConstraint: true, name: 'Menu_Accesos' });
Accesos.belongsTo(Menu, { foreignKey: 'id_menu', foreignKeyConstraint: true, name: 'Accesos_Menu' });

// menu e Item
Menu.hasMany(Item, { foreignKey: 'id_menu', foreignKeyConstraint: true, name: 'Menu_Items' });
Item.belongsTo(Menu, { foreignKey: 'id_menu', foreignKeyConstraint: true, name: 'Items_Menu' });




const syncTables = async () => {
    try {
        await Item.sync({ force: false, logging: false });
        await Menu.sync({ force: false, logging: false });
        await Accesos.sync({ force: false, logging: false });
        await Usuario.sync({ force: false, logging: false });

        await Empleado.sync({ force: true, logging: false });
        await EmpresaArt.sync({ force: true, logging: false });
        await EmpresaMedicinaLaboral.sync({ force: true, logging: false });


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


const syncAllTables = async () => {
    // primero deshabilito las claves externas
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });

    await syncTables();

    // habilito las claves externas


    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
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
    Empresa, UnidadNegocio, Localidad, Provincia, Cliente,
    Provedor, CondicionPago, CondicionIva, ComprobantesCompras, TipoComprobantes, PuntoVentasCliente,
    PuntoVentasClientePago, Empleado, EmpresaArt, EmpresaMedicinaLaboral, Menu, Item, Accesos, Usuario,
}



