import * as Sequelize from 'sequelize';
import { connection } from './connection';

import * as until from 'util';
const sqlTpl = require('./user.sql');

export interface IAttributes {
    id: string;
    app: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    roles: string;
    confirmed: boolean;
    create_at: Date | null;
    login_at: Date | null;
    beforelogin_at: Date | null;
}

export interface IInstance extends IAttributes, Sequelize.Instance<IAttributes> {

}

export interface IModel extends Sequelize.Model<IInstance, IAttributes> {

}

interface Coll {
    [key: string]: IModel
}
interface Coll1 {
    [key: string]: Promise<IModel>
}
const $list: Coll = {};
const $process: Coll1 = {};



function tableName(key: string) {
    return `user-${key}`;
}

function modelName(key: string) {
    return `User${key}`;
}

export async function hasUserModel(key: string) {

    let list = await connection.query(`select * from information_schema.tables where TABLE_NAME = '${tableName(key)}'`);
    if (list && list[0].length) {
        return true;
    }
    return false;
}

async function create(key: string) {
    let qSql = until.format(sqlTpl, tableName(key))
    await connection.query({ query: qSql, values: [] });
}

function define(key: string) {
    var options: Sequelize.DefineOptions<IInstance> = {
        tableName: tableName(key),
        timestamps: false
    };

    var UserModel = connection.define<IInstance, IAttributes>(modelName(key), {
        id: {
            type: Sequelize.STRING,
            field: "id",
            primaryKey: true
        },
        app: {
            type: Sequelize.INTEGER,
            field: "app",
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            field: "name",
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        roles: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        confirmed: {
            type: Sequelize.BOOLEAN
        },
        create_at: {
            type: Sequelize.DATE
        },
        login_at: {
            type: Sequelize.DATE
        },
        beforelogin_at: {
            type: Sequelize.DATE
        },
    }, options);



    return UserModel;
}

export async function Load(key: string) {
    if (key in $list) {
        return $list[key];
    }

    if (key in $process) {
        return $process[key];
    }

    var resp = $process[key] = (async () => {
        var h = await hasUserModel(key);
        if (!h) {
            await create(key);
        }
        return define(key);

    })();

    return resp.then(UserModel => {
        $list[key] = UserModel;
        delete $process[key]

        return UserModel;
    });
}



export async function findByEmail(UserModel: IModel, appid: number, email: string) {
    return await UserModel.findOne({
        where: {
            app: appid, email
        }
    });
}

export async function findByPhone(UserModel: IModel, appid: number, phone: string) {
    return await UserModel.findOne({
        where: {
            app: appid, phone
        }
    });
}