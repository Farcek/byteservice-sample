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


export interface IState {
    env: string // 'production' | 'development' | 'staging'
}

export const $state:IState = config.get('state');

console.log(`loading config dir "${config.util.getEnv('NODE_CONFIG_DIR')}"`)
console.log(`loading env "${$state.env}"`)