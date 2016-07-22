import { ErrorMessageService } from './services/error-message.service';
import { CustomValidators } from './services/custom-validators.service';

export * from './services/error-message.service';
export * from './services/custom-validators.service';

export const SERVICES: any[] = [
  ErrorMessageService,
  CustomValidators
];
