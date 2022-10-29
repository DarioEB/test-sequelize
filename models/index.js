'use strict';
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: 'test_seq',
    username: 'root',
    password: 'Chimuelo@99',
    host: 'localhost',
    port: '3306',
    omitNull: true,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 1,
        idle: 10000
    },
    logging: false
});

const User = require('./user')(sequelize, Sequelize);
const Product = require('./products')(sequelize, Sequelize);

async function connectToMysql() {
    let attempt = 0;
    let connectionOk = false;
    while (!connectionOk && attempt < 1) {
        // logger.debug(`[DB] Intenta conectarse -> ${attempt}`);
        console.log('Intentando conectarse ->')
        attempt++;
        try {
            await sequelize.authenticate();
            connectionOk = true;
        } catch (error) {
            // logger.info(`Connection error: ${error.message}`);
            await waitInterval(1);
        }
    }
    if (!connectionOk) {
        throw new Error('');
    }
}

function initDb() {
    return connectToMysql()
        .then(() => {
            Product.belongsTo(User, {
                foreignKey: 'user_id',
                as: 'user'
            });
            User.hasMany(Product, {
                foreignKey: 'user_id',
                as: 'user'
            })
            return sequelize.sync();
        });
}

module.exports = {
    Product,
    User,
    connectToMysql,
    initDb,
}