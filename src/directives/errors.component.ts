import { Component, OnInit, Host, Optional } from '@angular/core';
import { FormGroupDirective, FormGroup, NgForm } from '@angular/forms';
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
      for (let fieldName of Object.keys(this.formGroup.controls)){
        if (this.formGroup.controls[fieldName].errors) {
          this.addErrors(fieldName, this.formGroup.controls[fieldName].errors);
        }
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
