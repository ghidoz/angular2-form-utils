# Angular 2 Form Utils

Some useful components and services that will help you while managing and validating Angular 2 Forms.

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide) [![Dependency Status](https://david-dm.org/ghidoz/angular2-form-utils.svg)](https://david-dm.org/ghidoz/angular2-form-utils) [![devDependency Status](https://david-dm.org/ghidoz/angular2-form-utils/dev-status.svg)](https://david-dm.org/ghidoz/angular2-form-utils#info=devDependencies) [![npm version](https://badge.fury.io/js/angular2-form-utils.svg)](https://badge.fury.io/js/angular2-form-utils)

## Table of Contents
- [Getting started](#getting-started)
    - [Installation](#installation)
    - [Form errors list](#form-errors-list)
    - [Custom Validators](#custom-validators)
- [Development](#development)
- [License](#licence)

## Getting started

### Installation

To install this library, run:
```bash
$ npm install angular2-form-utils --save
```

If you use [Angular-CLI](https://github.com/angular/angular-cli), add the package to `system-config.ts`:
```typescript
const map: any = {
  'angular2-form-utils': 'vendor/angular2-form-utils/dist'
};

const packages: any = {
  'angular2-form-utils': {defaultExtension: 'js', main: 'index.js'}
};
```

and to `angular-cli-build.js`:
```javascript
vendorNpmFiles: [
    // ...
    'angular2-form-utils/dist/**/*.+(ts|js|js.map)'
]
```

Add the library's `DIRECTIVES` and `SERVICES` to the component with the form:
```typescript
import { Component } from '@angular/core';
import { DIRECTIVES, SERVICES } from 'angular2-form-utils';

@Component({
  selector: 'my-form'
  directives: [DIRECTIVES],
  providers: [SERVICES]
})
export class MyFormComponent{
  // ...
}
```

### Form Errors List

Show a list of error messages under your form, like:

> - **Username**: is required
> - **Password**: must be at least 8 characters long

#### How to use
 
Add a **template reference variable** to your form, binding it to `ngForm`:

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form.value)">
...
</form>
```

Add the `<errors>`component inside your form, passing the variable:

```html
<errors [form]="form"></errors>
```

If you want to customize the error messages or add new ones, use the `ErrorMessageService`:
```typescript
import { ErrorMessageService } from 'angular2-form-utils';
// ...
constructor(errorMessageService: ErrorMessageService) {
    errorMessageService.setErrorMessages({
        required: 'please, fill this!'
    });
}
```

Fields names in the errors list are based on input names or FormControl names and humanized (`first_name` becames `First Name`), but if you want to customize them, you can set a map object:

```typescript
import { ErrorMessageService } from 'angular2-form-utils';
// ...
constructor(errorMessageService: ErrorMessageService) {
    errorMessageService.setFieldsNames({
      first_name: 'Name',
      last_name: 'Surname'
    });
}
```

### Custom Validators

Some built in useful validators that you can apply to your forms:

 - `CustomValidators.email`: check if it's a valid email

#### How to use

Import and use them as classical Validators:

```typescript
import { CustomValidators } from 'angular2-form-utils';
// ...
constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      email: ['', [Validators.required, CustomValidators.email]]
    });
}
```

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Daniele Ghidoli](http://danieleghidoli.it)
