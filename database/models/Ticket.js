module.exports = function(sequelize, dataTypes){

    let alias = "Ticket"

    let cols = {
        id_ticket: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        id_payment_type: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "tickets",
        timestamps: false
    }

    let Ticket = sequelize.define(alias, cols, config);

    Ticket.associate = function(models){
        Ticket.belongsToMany(models.Product, {
            as: "products",
            through: "sales",
            foreignKey: "id_product",
            otherKey: "id_ticket",
            timestamps: false
        });
        Ticket.belongsTo(models.Payment_type, {
            as: "payment_types",
            foreignKey: "id_payment_type"
        });
        Ticket.belongsTo(models.User, {
            as: "users",
            foreignKey: "id_user"
        });
    }

    return Ticket;
}