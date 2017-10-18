import * as classrouter from 'classrouter';

import {Log} from './log';

@classrouter.PATH('/log')
@classrouter.SubRouter(Log)
export class LogIndex{}