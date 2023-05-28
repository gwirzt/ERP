module.exports = (sequelize, type) => {
    return sequelize.define('Usuarios', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING,
        password: type.STRING(150),
        email: type.STRING
    });
};
