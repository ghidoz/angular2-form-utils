import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../services/custom-validators.service';

@Directive({
  selector: '[validateEmail][ngModel],[validateEmail][formControl]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true}]
})
export class EmailValidatorDirective implements Validator {

    validate(control: AbstractControl): {[key: string]: any} {
        return CustomValidators.email(control);
    }

}
