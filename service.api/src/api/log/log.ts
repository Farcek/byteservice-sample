import * as classrouter from 'classrouter';
import * as IModel from 'core/model';
import * as errors from 'core/errors';

import { jsonBodyParser, IClientTokenParserResult } from '../parser';


interface IResult {
    id: string
}

@classrouter.POST
@classrouter.PATH('/:name')
@classrouter.before(jsonBodyParser)
export class Log implements classrouter.IRoute {


    @classrouter.PathParam()
    name: string

    @classrouter.ReqestParam()
    tokenParse: () => Promise<IClientTokenParserResult>


    @classrouter.BodyParam()
    @classrouter.validator.IsNotEmpty()
    message: string


    @classrouter.BodyParam()
    attr: any

    async action(req: any): Promise<IResult> {

        let { clientToken, app } = await this.tokenParse();

        let Model = await IModel.IApp.loadLogger(app, this.name);

        let row = await Model.create({
            ancher: clientToken.anchar,
            owner: clientToken.owner,
            message: this.message,
            attr: this.attr,
            at: new Date()
        } as IModel.ILogger.IAttributes);


        return {
            id: '' + row.id
        }
    }
}