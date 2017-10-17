import "reflect-metadata";
import * as express from "express";

import * as classrouter from "classrouter";

const morgan = require('morgan');
const pkg:{name:string} = require('../package.json');

import {apiConf } from 'core/config';
import * as IModel from 'core/model';
import * as errors from 'core/errors';


const app = express();
app.use(morgan('dev'));

//app.use('/', classrouter.attach(express.Router(), ApiRouter, 'app'))


app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    if (err instanceof classrouter.ClassrouterValidationError) {
        var error = new errors.ValidationErrors();
        if (err && Array.isArray(err)) {
            for (let it of err) {
                if (it.constraints) {
                    let msg = Object.keys(it.constraints).map(key => it.constraints[key]).join('; ');
                    error.addError(it.property, msg)
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
    })
    .catch(err => {
        console.log('cannot login database', err);
    });