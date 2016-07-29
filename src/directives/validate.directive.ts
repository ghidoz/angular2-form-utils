import { Directive, OnInit, ElementRef, Renderer, EventEmitter, Optional } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ObservableWrapper } from '@angular/forms/src/facade/async';

@Directive({
  selector: '[validate]'
})
export class ValidateDirective implements OnInit {

    showErrors: EventEmitter<any> = new EventEmitter();

    constructor(
        private el: ElementRef,
        private renderer: Renderer,
        @Optional() private formGroup: FormGroupDirective,
        @Optional() private ngForm: NgForm
    ) { }

    ngOnInit() {
        this.renderer.setElementAttribute(this.el.nativeElement, 'novalidate', 'novalidate');
        let eventEmitter = this.showErrors;
        let form: FormGroupDirective | NgForm = this.formGroup || this.ngForm;
        form.onSubmit = function(){
            this._submitted = true;
            if (this.valid) {
                ObservableWrapper.callEmit(this.ngSubmit, null);
            } else {
                eventEmitter.emit(this.valid);
            }
            return false;
        };
    }
}
