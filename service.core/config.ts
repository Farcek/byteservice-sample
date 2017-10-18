const config = require('config');


// database
export interface IDB {
    database: string;
    username: string;
    password: string;

    host: string;
    port: number;

    dialect: string;
    pool: any;
    debug: boolean
    loggerDefineForce: boolean
}
export const databaseConf:IDB = config.get('database');


// api
export interface IAPI {
    port: number
}
export const apiConf:IAPI = config.get('api');




// console
export interface IConsole {
    port: number
   
}
export const consoleConf:IConsole = config.get('console');


export interface IStatus {
    isProd: boolean
    isDev: boolean
    isStaging: boolean
    env: 'production' | 'development' | 'staging'
}


console.log(`loading config dir "${process.env.NODE_CONFIG_DIR || process.cwd()}"`)
