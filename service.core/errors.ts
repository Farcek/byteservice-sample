import * as classrouter from 'classrouter';

export interface IErrorItems {
    [property: string]: string
    [inx: number]: string
}
export class BaseError {
    public name: string
    public code: number
    public message: string
    public errors: IErrorItems
    constructor(name: string, code: number) {
        this.name = name;
        this.code = code || 500;
    }
}
export class ValidationError extends BaseError {
    constructor(message: string) {
        super('validation', 400);
        this.message = message;
    }
}

export interface FormValidationWarning {
    [property: string]: string[]
}

export class ValidationErrors extends BaseError {


    constructor() {
        super('validation-errors', 400);
    }

    addError(property: string, message: string) {
        if (property && message) {
            let errors = this.errors || (this.errors = {});
            errors[property] = message;
        }
    }
}

export class NotFound extends BaseError {
    /**
     * @param target Missing target object
     * @param key find key
     */
    constructor(public target: string, key: any) {
        super('notfound', 404);
        this.message = `not found ${target}. find by the '${key}' key`
    }
}

export class Error extends BaseError {
    constructor(public message: string, code: number) {
        super('error', code);
    }
}