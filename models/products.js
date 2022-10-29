'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {}
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        stock: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Product',
        tableName: 'products'
    });
    return Product;
};
