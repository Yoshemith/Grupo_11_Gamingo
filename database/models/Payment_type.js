module.exports = function(sequelize, dataTypes){

    let alias = "Payment_type"

    let cols = {
        id_payment_type: {
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
        tableName: "payment_types",
        timestamps: false
    }

    let Payment_type = sequelize.define(alias, cols, config);

    Payment_type.associate = function(models){
        Payment_type.hasMany(models.Ticket, {
            as: "tickets",
            foreignKey: "id_pyment_type"
        });
    }

    return Payment_type;
}