import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../services/custom-validators.service';

@Directive({
    selector: '[min][ngModel],[min][formControl]',
    providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => MinValidatorDirective), multi: true}]
})
export class MinValidatorDirective implements Validator {

  private validator: Function;

  constructor(@Attribute('min') min: string) {
    this.validator = CustomValidators.min(Number(min));
  }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.validator(control);
  }

}
