module.exports = function(sequelize, dataTypes){

    let alias = "Product"

    let cols = {
        id_product: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        id_category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        product_image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsToMany(models.Ticket, {
            as: "tickets",
            through: "sales",
            foreignKey: "id_product",
            otherKey: "id_ticket",
            timestamps: false
        });
        Product.belongsTo(models.Category, {
            as: "categorys",
            foreignKey: "id_category"
        });
    }

    return Product;
}