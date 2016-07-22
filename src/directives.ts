import { ErrorsComponent } from './directives/errors.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';

export * from './directives/errors.component';
export * from './directives/email-validator.directive';

export const DIRECTIVES: any[] = [
  ErrorsComponent,
  EmailValidatorDirective
];
