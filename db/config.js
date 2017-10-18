var config = require('config');
var databaseConf = config.get('database');
var configDir = process.env.NODE_CONFIG_DIR || process.cwd();
console.log('loading config dir :' + configDir);

module.exports = {
    "development": {
        "username": configDir.username,
        "password": configDir.password,
        "database": configDir.database,
        "host": configDir.host,
        "dialect": configDir.dialect
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};