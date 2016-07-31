import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../services/custom-validators.service';

@Directive({
    selector: '[match][ngModelGroup]',
    providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => MatchValidatorDirective), multi: true}]
})
export class MatchValidatorDirective implements Validator {

  private validator: Function;

  constructor(@Attribute('match') match: string) {
    let fields = match.split(',');
    this.validator = CustomValidators.match(fields[0], fields[1]);
  }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.validator(control);
  }

}
