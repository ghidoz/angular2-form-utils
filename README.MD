# Angular 2 Form Utils

Some useful components and services that will help you while managing and validating Angular 2 Forms.

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide) [![Dependency Status](https://david-dm.org/ghidoz/angular2-form-utils.svg)](https://david-dm.org/ghidoz/angular2-form-utils) [![devDependency Status](https://david-dm.org/ghidoz/angular2-form-utils/dev-status.svg)](https://david-dm.org/ghidoz/angular2-form-utils#info=devDependencies) [![npm version](https://badge.fury.io/js/angular2-form-utils.svg)](https://badge.fury.io/js/angular2-form-utils)

## Table of Contents
- [Installation](#installation)
- [Features](#features)
    - [Validate Directive and form errors list](#validate-directive-and-form-errors-list)
    - [Error Messages](#error-messages)
    - [Custom Validators](#custom-validators)
- [TODO](#todo)
- [Development](#development)
- [License](#licence)


## Installation

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
## Features

### Validate Directive and Form Errors List

When the user submits your form:

1) If there are errors, a list of error messages will appear under your form, like:

> - **Username**: is required
> - **Password**: must be at least 8 characters long

2) Error messages update or disappear as the user edits the fields.
3) Your `ngSubmit`method will be called only if the form is valid.

Moreover, the `novalidate` attribute is automatically added to your form.

#### How to use
 
Add the `validate` directive to your form:

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form.value)" validate>
...
</form>
```

Add the `<errors>`component inside your form:

```html
<errors></errors>
```

### Error Messages

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

Some built-in Validators (as well as some Custom Validators) has params that you can use in your custom messages using `{{paramName}}`. 

Here are the default messages:

```typescript
required: 'is required',
minlength: 'must be at least {{requiredLength}} characters long',
maxlength: 'must be no more than {{requiredLength}} characters long',
email: 'must be valid',
min: 'must be a number greater than or equal to {{requiredMin}}',
max: 'must be a number less than or equal to {{requiredMax}}'
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
 - `CustomValidators.min`check if it's a number greater than `min`
 - `CustomValidators.max` check if it's a number less than `max` 

#### How to use

Import and use them as built-in Validators. Using the `FormBuilder`:

```typescript
import { CustomValidators } from 'angular2-form-utils';
// ...
constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      age: ['', [Validators.required, CustomValidators.min(18), CustomValidators.max(42)]]
    });
}
```

or directly in template-driven forms:

```html
<input type="email" name="email" ngModel validateEmail required />
<input type="number" name="age" ngModel min="18" max="42" required />
```

## TODO
- Add unit testing and E2E testing
- Add more Custom Validators

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Daniele Ghidoli](http://danieleghidoli.it)
