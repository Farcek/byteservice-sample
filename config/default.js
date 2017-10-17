var fs = require('fs');
module.exports = {
    database: {
        database: "",
        username: "",
        password: "",

        host: "localhost",
        port: 3306,

        dialect: "mysql",

        debug: true
    },

    api: {
        port: 8301
    },
    console: {
        port: 8302
    }
};