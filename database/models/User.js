module.exports = function(sequelize, dataTypes){

    let alias = "User"

    let cols = {
        id_user: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstname: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        lastname: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        user_image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        id_typeUser: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.hasMany(models.Ticket, {
            as: "tickets",
            foreignKey: "id_user"
        });
        User.belongsTo(models.User_type, {
            as: "user_types",
            foreignKey: "id_typeUser"
        });
    }

    return User;
}