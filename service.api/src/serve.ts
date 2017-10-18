import "reflect-metadata";
import * as express from "express";

import * as classrouter from "classrouter";

const morgan = require('morgan');
const pkg: { name: string } = require('../package.json');

import { apiConf } from 'core/config';
import * as IModel from 'core/model';
import * as errors from 'core/errors';


import { Api as ApiRouter } from './api/index';

const app = express();
app.use(morgan('dev'));

app.use('/', classrouter.attach(express.Router(), ApiRouter, 'app'))


app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    if (err instanceof classrouter.ClassrouterValidationError) {
        var error = new errors.ValidationErrors();
        //console.log(err.errors)
        if (err && Array.isArray(err.errors)) {
            for (let item of err.errors) {
                if (item && item.constraints) {
                    let msg = Object.keys(item.constraints)
                        .map(key => item && item.constraints && item.constraints[key])
                        .join('; ');
                    error.addError(item.property, msg)
                }
            }
        }
        next(error);
    } else {
        next(err);
    }
});

app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    if (err instanceof errors.BaseError) {
        res.status(err.code);
        res.json({
            code: err.code,
            name: err.name,
            message: err.message,
            errors: err.errors
        });
    } else {
        res.status(500);
        res.json({
            name: 'notsupport',
            message: (err && (err.message || JSON.stringify(err))) || 'not error message'
        });
    }
});


IModel.check()
    .then(() => {
        app.listen(apiConf.port, () => {
            console.log(`Starting ${pkg.name}. listening on port ${apiConf.port}!`)
        });

        // IModel.LoggerByLoadOrCreate('hahah')
        //     .then(Model => {
        //         return Model.create(<IModel.ILogger.IAttributes>{
        //             //id : '',
        //             ancher: '',
        //             at: new Date(),
        //             attr: { hh:11},
        //             message: '',
        //             owner: ''
        //         })

        //     })
        //     .then(r => {
        //         console.log(r)
        //     })
        //     .catch(e => {
        //         console.log(e)
        //     })
    })
    .catch(err => {
        console.log('cannot login database', err);
    });