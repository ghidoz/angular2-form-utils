import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../services/custom-validators.service';

@Directive({
    selector: '[max][ngModel],[max][formControl]',
    providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => MaxValidatorDirective), multi: true}]
})
export class MaxValidatorDirective implements Validator {

  private validator: Function;

  constructor(@Attribute('max') max: string) {
    this.validator = CustomValidators.max(Number(max));
  }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.validator(control);
  }

}
