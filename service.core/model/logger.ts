import * as Sequelize from 'sequelize';
import { connection } from './connection';
import { databaseConf } from '../config';

import * as until from 'util';


export interface IAttributes {
    id: number;

    /**
     * log yamar gazar-s uussen
     */
    ancher: string;
    /**
     * Log uusgegch program
     */
    owner: string;
    message: string;
    attr: any;
    at: Date;
}

export interface IInstance extends IAttributes, Sequelize.Instance<IAttributes> {

}

export interface IModel extends Sequelize.Model<IInstance, IAttributes> {

}





function tableName(key: string) {
    return `log-${key}`;
}

function modelName(key: string) {
    return `Log${key}`;
}

// export async function hasModel(key: string) {

//     let list = await connection.query(`SELECT EXISTS (SELECT 1 FROM   information_schema.tables WHERE  table_schema = 'public' AND table_name = '${tableName(key)}');`);
//     if (list && list[0].length) {
//         return true;
//     }
//     return false;
// }



function define(key: string) {
    var options: Sequelize.DefineOptions<IInstance> = {
        tableName: tableName(key),
        timestamps: false
    };

    var LoggerModel = connection.define<IInstance, IAttributes>(modelName(key), {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ancher: {
            type: Sequelize.STRING,
            allowNull: false
        },
        owner: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING
        },
        attr: {
            type: Sequelize.JSON
        },
        at: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, options);



    return LoggerModel;
}

interface IModelCollection {
    [key: string]: IModel
}
interface IProcessCollection {
    [key: string]: Promise<IModel>
}

const $list: IModelCollection = {};
const $process: IProcessCollection = {};

export async function LoadOrCreate(key: string): Promise<IModel> {
    if (key in $list) {
        return $list[key];
    }

    if (key in $process) {
        return $process[key];
    }

    let process = $process[key] = (async () => {
        return await define(key).sync({ force: databaseConf.loggerDefineForce });
    })();

    return process
        .then(Model => {
            $list[key] = Model;
            delete $process[key];
            return Model;
        });
}



function log(name: string, author: string, owner: string, message: string, attr: any) {

}