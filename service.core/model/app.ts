import * as Sequelize from 'sequelize';
import { connection } from './connection';
import * as IUser from './user';


export interface IAttributes {
    id: number | null;
    name: string;
    usertable: string;
    /**
     * ssh-keygen Pem result
     */
    pemkey: string;

    /**
     * User token key
     */
    tokenkey: string

    /**
     * User id
     */
    ovner: string;

    /**
     * Application Roles 
     */
    roles: string;

    /**
     * Application Resources
     */
    resources: string;

    /**
     * Application Masks
     */
    masks: string;

    createAt: Date
}

export interface IInstance extends IAttributes, Sequelize.Instance<IAttributes> {

}

export interface IModel extends Sequelize.Model<IInstance, IAttributes> {

}


export const App = (() => {

    var options: Sequelize.DefineOptions<IInstance> = {
        tableName: "app",
        timestamps: false,
        classMethods: {},
        instanceMethods: {}
    };

    return <IModel>connection.define<IInstance, IAttributes>('App', {
        id: {
            type: Sequelize.INTEGER,
            field: "id",
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            field: "name",
            allowNull: false
        },
        usertable: {
            type: Sequelize.STRING,
            field: "usertable",
            allowNull: false
        },
        ovner: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tokenkey: {
            type: Sequelize.STRING
        },
        pemkey: {
            type: Sequelize.TEXT
        },
        roles: {
            type: Sequelize.TEXT
        },
        resources: {
            type: Sequelize.TEXT
        },
        masks: {
            type: Sequelize.TEXT
        },
        createAt: Sequelize.DATE
    }, options);
})();

export async function userModelByAppId(appid: number) {


    var app = await App.findById(appid);
    if (app) {
        return await userModelByApp(app);
    }

    return null;
}

export async function userModelByApp(app: IInstance) {



    if (app && app.usertable) {
        return await IUser.Load(app.usertable);
    }
    return null;
}
