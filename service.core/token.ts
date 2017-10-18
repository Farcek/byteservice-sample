import * as ICommon from './common';
const jwt = require('jsonwebtoken');


export interface IClientToken {
    appid: number
    owner: string
    anchar: string
}

export class ClientToken {

    static gen(appid: number, owner: string, anchar: string, key: string, expiresIn: string): string {
        return ICommon.jwtEncryption({ ap: appid, ow: owner, an: anchar }, { pass: key, jwtid: 'logger-client', expiresIn });
    }

    static parse(token: string): IClientToken | null {
        let decode = jwt.decode(token);
        if (decode && decode.jti === 'logger-client') {
            return { appid: decode.ap, owner: decode.ow, anchar: decode.an };
        }
        return null;
    }

    static virify(token: string, key: string): IClientToken | null {
        let decode = jwt.verify(token, key, { jwtid: 'logger-client' });

        if (decode) {
            return { appid: decode.ap, owner: decode.ow, anchar: decode.an };
        }
        return null;
    }
}


var t = ClientToken.gen(1,"printer", "pc1", '123456789', '5h')
console.log('sampletoken ', t);