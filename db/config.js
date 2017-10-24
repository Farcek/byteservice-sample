process.env.NODE_CONFIG_DIR = require('path').join(__dirname, '../config');
console.log('conf dir=', process.env.NODE_CONFIG_DIR);

var databaseConf = require('config').get('database');
var config = {
    "username": databaseConf.username,
    "password": databaseConf.password,
    "database": databaseConf.database,
    "host": databaseConf.host,
    "dialect": databaseConf.dialect
};

module.exports = {
    "development": config,
    "production": config,
    "test": config,
    "staging": config,
};