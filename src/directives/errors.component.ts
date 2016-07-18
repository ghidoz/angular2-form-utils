import { Component, OnInit, Input } from '@angular/core';
import { FormGroupDirective, FormGroup } from '@angular/forms';

@Component({
  selector: 'errors',
  template: `<ul>
                <li *ngFor="let error of errors">
                    <b>{{error.field}}</b>: {{error.message}}
                </li>
            </ul>`
})
export class ErrorsComponent implements OnInit {

  @Input() form: FormGroupDirective;
  private formGroup: FormGroup;
  private errors: {field: string, message: string}[];

  errorMessages: any = {
    required: 'is required',
    minlength: 'must be at least {{requiredLength}} characters long',
    maxlength: 'must be no more than {{requiredLength}} characters long'
  }

  constructor() { }

  ngOnInit() {
    this.formGroup = this.form.form;
    this.formGroup.valueChanges.subscribe(() => this.getErrors());
    this.form.ngSubmit.subscribe(() => this.getErrors());
  }

  getErrors() {
    if (this.form.submitted) {
      this.errors = [];
      for (let fieldName of Object.keys(this.formGroup.controls)){
        if (this.formGroup.controls[fieldName].errors){
          this.addErrors(fieldName, this.formGroup.controls[fieldName].errors);
        }
      }
    }
  }

  addErrors(fieldName: string, errors: any){
    for (let error of Object.keys(errors)){
      this.errors.push({
        field: this.getFieldName(fieldName),
        message: this.getErrorMessage(error, errors[error])
      });
    }
  }

  getErrorMessage(error: string, params: any){
    let errorMessage = this.errorMessages[error];
    if (params){
      for (let param of Object.keys(params)){
        errorMessage = errorMessage.replace('{{' + param + '}}', params[param]);
      }
    }
    return errorMessage;
  }

  getFieldName(field: string){
    return field.toLowerCase()
        .split('_')
        .map(i => i[0].toUpperCase() + i.substring(1))
        .join(' ');
  }

}
