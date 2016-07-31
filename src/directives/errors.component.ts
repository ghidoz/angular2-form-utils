import { Component, OnInit, Host, Optional } from '@angular/core';
import { FormGroupDirective, FormGroup, NgForm, FormControl, AbstractControl } from '@angular/forms';
import { ErrorMessageService } from '../services/error-message.service';
import { ValidateDirective } from './validate.directive';

@Component({
  selector: 'errors',
  template: `<ul>
                <li *ngFor="let error of errors">
                    <b>{{error.field}}</b>: {{error.message}}
                </li>
            </ul>`
})
export class ErrorsComponent implements OnInit {

  private form: FormGroupDirective | NgForm;
  private formGroup: FormGroup;
  private errors: {field: string, message: string}[];

  constructor(
    private errorMessageService: ErrorMessageService,
    @Host() private validate: ValidateDirective,
    @Optional() private formGroupDirective: FormGroupDirective,
    @Optional() @Host() private ngForm: NgForm
  ) {
    this.form = this.formGroupDirective || this.ngForm;
  }

  ngOnInit() {
    this.formGroup = this.form.form;
    this.formGroup.valueChanges.subscribe(() => this.getErrors());
    this.validate.showErrors.subscribe(() => this.getErrors());
  }

  private getErrors() {
    if (this.form.submitted) {
      this.errors = [];
      this.getErrorsFromControls(this.formGroup.controls);
    }
  }

  private getErrorsFromControls(controls: { [key: string]: AbstractControl}) {
    for (let fieldName of Object.keys(controls)){
      let control = controls[fieldName];
      if (control instanceof FormGroup) {
        this.getErrorsFromControls(control.controls);
      }
      if (control.errors) {
        this.addErrors(fieldName, controls[fieldName].errors);
      }
    }
  }

  private addErrors(fieldName: string, errors: any) {
    for (let error of Object.keys(errors)) {
      this.errors.push({
        field: this.errorMessageService.getFieldName(fieldName),
        message: this.errorMessageService.getErrorMessage(error, errors[error])
      });
    }
  }
}
