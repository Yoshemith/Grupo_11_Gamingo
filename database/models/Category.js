module.exports = function(sequelize, dataTypes){

    let alias = "Category"

    let cols = {
        id_category: {
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
        tableName: "categories",
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "id_category"
        });
    }

    return Category;
}