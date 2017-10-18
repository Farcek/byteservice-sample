import * as Sequelize from 'sequelize';
import { connection } from './connection';
import * as logger from './logger';



export interface IAttributes {
    id: number;
    name: string;

    /**
     * token key
     */
    tokenkey: string

    /**
     * User id
     */
    ovner: string;

    loggers: string[]

    created_at: Date
}

export interface IInstance extends IAttributes, Sequelize.Instance<IAttributes> {

}

export interface IModel extends Sequelize.Model<IInstance, IAttributes> {

}


export const App = (() => {

    var options: Sequelize.DefineOptions<IInstance> = {
        tableName: "app",
        timestamps: false
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
        tokenkey: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ovner: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created_at: Sequelize.DATE,
        loggers: Sequelize.ARRAY(Sequelize.STRING)
    }, options);
})();


export async function loadLogger(app: IInstance, loggerName: string) {

    if (app && loggerName) {

        if (app.loggers && Array.isArray(app.loggers)) {
            var loogers = app.loggers;
            if (loogers.indexOf(loggerName) === -1) {
                loogers.push(loggerName);
                app.loggers = loogers;
                await app.save();
            }
        } else {
            app.loggers = [loggerName];
            await app.save();
        }

        let key = `A${app.id}-${loggerName}`;
        let Model = await logger.LoadOrCreate(key);
        if (Model) return Model;
    }
    throw 'cannot load logger model';
}