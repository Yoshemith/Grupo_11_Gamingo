module.exports = function(sequelize, dataTypes){

    let alias = "User_type"

    let cols = {
        id_typeUser: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }

    let config = {
        tableName: "user_types",
        timestamps: false
    }

    let User_type = sequelize.define(alias, cols, config);

    User_type.associate = function(models){
        User_type.hasMany(models.User, {
            as: "users",
            foreignKey: "id_typeUser"
        });
    }

    return User_type;
}