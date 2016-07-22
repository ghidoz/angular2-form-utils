import { isPresent } from '@angular/forms/src/facade/lang';
import { Validators, AbstractControl } from '@angular/forms';

export class CustomValidators {

    /**
     * Validator that requires controls to be a valid email.
     */
    static email(control: AbstractControl): { [key: string]: boolean } {
        if (isPresent(Validators.required(control))) {
            return null;
        }
        // See: https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
        let pattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return pattern.test(control.value) ? null : {'email': true};
    }

    static min(min: number): Function {
        return (control: AbstractControl): { [key: string]: any } => {
            if (isPresent(Validators.required(control))) {
                return null;
            }
            let v: number = Number(control.value);
            return v < min ? {'min': {'requiredMin': min, 'actualMin': v}} : null;
        };
    }

    static max(max: number): Function {
        return (control: AbstractControl): { [key: string]: any } => {
            if (isPresent(Validators.required(control))) {
                return null;
            }
            let v: number = Number(control.value);
            return v > max ? {'max': {'requiredMax': max, 'actualMax': v}} : null;
        };
    }

};
