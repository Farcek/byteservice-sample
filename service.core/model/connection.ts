import * as Sequelize from 'sequelize';
import { databaseConf } from '../config';


const winston = require('winston');
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'sql.log' })
    ]
})


export const connection: Sequelize.Sequelize = new Sequelize(databaseConf.database, databaseConf.username, databaseConf.password, <any>{
    operatorsAliases : false,
    host: databaseConf.host,
    dialect: databaseConf.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone : '+08:00',
    logging: databaseConf.debug ? (msg: string) => logger.info(msg) : false
});

