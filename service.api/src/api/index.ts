import * as classrouter from 'classrouter';
import { clientTokenParser } from './parser';
import { LogIndex } from './log/index';

@classrouter.PATH('/api')
@classrouter.SubRouter(LogIndex)
export class Api {


    @classrouter.HeaderParam('authorization')
    clientToken: string

    @classrouter.Middleware()
    tokenParse() {
        return async () => {
            return await clientTokenParser(this.clientToken);
        }
    }
}