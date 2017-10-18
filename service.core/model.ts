import * as Sequelize from 'sequelize';
import { connection } from "./model/connection";

import * as IApp from "./model/app";
import * as ILogger from "./model/logger";

export {
    IApp, ILogger
}

export async function check() {
    try {
        await connection.authenticate();
        //await connection.sync({force:true})
        console.log('db connection success')
    } catch (error) {
        console.log('db connection loss', error)
    }
}

export function associate() {
    var models: any = connection.models;
    Object.keys(models).forEach((modelName) => {
        var assoc = models[modelName]['associate'];
        if (assoc && typeof assoc == 'function') {
            assoc(models);
        }
    });
}

export async function LoggerByLoadOrCreate(key: string) {
    return await ILogger.LoadOrCreate(key)
}