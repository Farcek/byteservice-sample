const bodyParser = require('body-parser')
import { ClientToken, IClientToken } from 'core/token'
import * as errors from 'core/errors'
import * as IModel from 'core/model'


export function urlencodedBodyParser() {
    return bodyParser.urlencoded({ extended: false });
}

export function jsonBodyParser() {
    return bodyParser.json();
}


export interface IClientTokenParserResult {
    clientToken: IClientToken
    app: IModel.IApp.IInstance
}
export async function clientTokenParser(clientToken: string): Promise<IClientTokenParserResult> {
    if (clientToken) {
        let dta = ClientToken.parse(clientToken);
        if (dta) {
            if (dta.appid) {
                let app = await IModel.IApp.App.findById(dta.appid);

                if (app && app.tokenkey) {
                    let clientTokenDta = ClientToken.virify(clientToken, app.tokenkey);
                    if (clientTokenDta) {
                        return { clientToken: clientTokenDta, app };
                    }
                }
            }
        }
        throw new errors.ValidationError('cannot parse token')
    }
    throw new errors.NotFound('headers', 'authorization')
}