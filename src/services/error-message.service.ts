import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMessageService {

    private errorMessages: { [s: string]: string; } = {
        required: 'is required',
        minlength: 'must be at least {{requiredLength}} characters long',
        maxlength: 'must be no more than {{requiredLength}} characters long'
    };

    constructor() { }

    /**
      * Set custom error messages that override the default ones
      * @param errorMessages An object {key: message}
      */
    setErrorMessages(errorMessages: { [s: string]: string; }) {
        this.errorMessages = Object.assign(this.errorMessages, errorMessages);
    }

    getErrorMessage(error: string, params: any): string {
        let errorMessage = this.errorMessages[error];
        if (params && errorMessage) {
            for (let param of Object.keys(params)){
                errorMessage = errorMessage.replace('{{' + param + '}}', params[param]);
            }
        }
        return errorMessage;
    }

    getFieldName(field: string): string {
        return field.toLowerCase()
            .split('_')
            .map(i => i[0].toUpperCase() + i.substring(1))
            .join(' ');
    }

}
