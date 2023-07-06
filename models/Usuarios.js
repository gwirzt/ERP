// tabla de usuarios
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
        username: DataTypes.STRING,
        password: DataTypes.STRING(150),
        email: DataTypes.STRING,
    }, {
        tableName: 'Usuarios',
        timestamps: false,

    });

    
    return Usuario;
}

