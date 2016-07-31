import { Directive, OnInit, ElementRef, Renderer, EventEmitter, Optional } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ObservableWrapper } from '@angular/forms/src/facade/async';

@Directive({
  selector: '[validate]',
  exportAs: 'validate'
})
export class ValidateDirective implements OnInit {

    showErrors: EventEmitter<any> = new EventEmitter();
    form: FormGroupDirective | NgForm;

    constructor(
        private el: ElementRef,
        private renderer: Renderer,
        @Optional() private formGroup: FormGroupDirective,
        @Optional() private ngForm: NgForm
    ) {
        this.form = this.formGroup || this.ngForm;
    }

    ngOnInit() {
        this.renderer.setElementAttribute(this.el.nativeElement, 'novalidate', 'novalidate');
        let eventEmitter: EventEmitter<any> = this.showErrors;
        this.form.onSubmit = function(){
            this._submitted = true;
            if (this.valid) {
                ObservableWrapper.callEmit(this.ngSubmit, null);
            } else {
                eventEmitter.emit(this.valid);
            }
            return false;
        };
    }

    addErrors(fieldName: string, errors: {[key: string]: any}) {
        this.form.form.controls[fieldName].setErrors(errors);
        this.showErrors.emit(false);
    }
}
