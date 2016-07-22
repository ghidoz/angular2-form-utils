import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMessageService {

    private errorMessages: { [key: string]: string } = {
        required: 'is required',
        minlength: 'must be at least {{requiredLength}} characters long',
        maxlength: 'must be no more than {{requiredLength}} characters long',
        email: 'must be valid',
        min: 'must be a number greater than or equal to {{requiredMin}}',
        max: 'must be a number less than or equal to {{requiredMax}}'
    };

    private fieldsNames: { [key: string]: string };

    constructor() { }

    /**
      * Set custom error messages that override the default ones
      * @param errorMessages An object {key: message}
      */
    setErrorMessages(errorMessages: { [key: string]: string; }) {
        this.errorMessages = Object.assign(this.errorMessages, errorMessages);
    }

    /**
      * Set custom fields names
      * @param errorMessages An object {key: name}
      */
    setFieldsNames(fieldsNames: { [key: string]: string; }) {
        this.fieldsNames = fieldsNames;
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
        if (this.fieldsNames && this.fieldsNames[field]) {
            return this.fieldsNames[field];
        }
        return field.toLowerCase()
            .split('_')
            .map(i => i[0].toUpperCase() + i.substring(1))
            .join(' ');
    }

}
