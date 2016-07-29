import { ErrorsComponent } from './directives/errors.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { MinValidatorDirective } from './directives/min-validator.directive';
import { MaxValidatorDirective } from './directives/max-validator.directive';
import { ValidateDirective } from './directives/validate.directive';

export * from './directives/errors.component';
export * from './directives/email-validator.directive';
export * from './directives/validate.directive';

export const DIRECTIVES: any[] = [
  ErrorsComponent,
  EmailValidatorDirective,
  MinValidatorDirective,
  MaxValidatorDirective,
  ValidateDirective
];
