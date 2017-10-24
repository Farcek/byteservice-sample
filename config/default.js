var fs = require('fs');



module.exports = {
    state: {
        //env: ''
    },
    database: {
        database: "",
        username: "",
        password: "",

        host: "localhost",
        // port: 3306,

        dialect: "postgres",

        debug: true,

        loggerDefineForce: false
    },

    api: {
        port: 8301
    },
    console: {
        port: 8302
    }
};