# Angular 2 Form Utils

Some useful components and services that will help you while managing and validating Angular 2 Forms.

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide) [![Dependency Status](https://david-dm.org/ghidoz/angular2-form-utils.svg)](https://david-dm.org/ghidoz/angular2-form-utils) [![devDependency Status](https://david-dm.org/ghidoz/angular2-form-utils/dev-status.svg)](https://david-dm.org/ghidoz/angular2-form-utils#info=devDependencies) [![npm version](https://badge.fury.io/js/angular2-form-utils.svg)](https://badge.fury.io/js/angular2-form-utils)

## Table of Contents
- [Installation](#installation)
- [Features](#features)
    - [Validate Directive](#validate-directive)
    - [Form Errors List](#form-errors-list)
    - [Error Messages](#error-messages)
    - [Custom Validators](#custom-validators)
    - [Server Side Errors](#server-side-errors)
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

### Validate Directive

Usually, when your form is submitted, it always calls your `ngSubmit` bound method and you have to manually check if the form is valid, before sending the info to the server. With this directive, instead, the method is called only if there are no errors.

Moreover, the `novalidate` attribute is automatically added to your form.

#### How to use
 
Just add the `validate` directive to your form:

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form.value)" validate>
...
</form>
```

### Form Errors List

If there are errors, a list of error messages will appear under your form, like:

> - **Username**: is required
> - **Password**: must be at least 8 characters long

Error messages update or disappear as the user edits the fields.

#### How to use

1. Add the the `validate` directive to the form ([see above](#validate-directive)).
2. Add the `<errors>` component inside your form:

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

Some useful validators that you can apply to your forms:

 - `CustomValidators.email`: checks if it's a valid email
 - `CustomValidators.min`checks if it's a number greater than `min`
 - `CustomValidators.max` checks if it's a number less than `max` 
 - `CustomValidators.match` checks if a field match another field (applicable only to `formGroup`s)

#### How to use

Import and use them as built-in Validators. Using the `FormBuilder`:

```typescript
import { CustomValidators } from 'angular2-form-utils';
// ...
constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      age: ['', [Validators.required, CustomValidators.min(18), CustomValidators.max(42)]],
      password_confirmation: fb.group({
          password: ['', [Validators.required, Validators.minLength(8)]],
          repeat_password:  ['']
      }, {validator: CustomValidators.match('password', 'repeat_password')}),
    });
}
```

```html
<input type="email" formControlName="email" />
<input type="number" formControlName="age" />
<fieldset formGroupName="password_confirmation">
    <input type="password" formControlName="password" />
    <input type="password" formControlName="repeat_password" />
</fieldset>
```

or directly in **template-driven forms**:

```html
<input type="email" name="email" ngModel validateEmail required />
<input type="number" name="age" ngModel min="18" max="42" required />
<fieldset ngModelGroup="password_confirmation" match="password,repeat_password">
    <input type="password" name="password" ngModel required minlength="8" />
    <input type="password" name="repeat_password" ngModel />
</fieldset>
```

### Server side errors

When the `ngSubmit`callback is fired, you can call your server and, if you get some errors, you can add them to the error list using the `addErrors` method.

#### How to use

Add the `validate` directive to your form, but also make sure to add a **template reference variable** bound with it, passing it to the `ngSubmit`callback.

```html
<form #v="validate" (ngSubmit)="onSubmit(v)" validate>
...
</form>
```

Now you can add your custom error from the `onSubmit` method:

```typescript
onSubmit(validate) {
  validate.addErrors('email', {
    unique: true
  });
}
```

A more real example is when you get errors from a server call:

```typescript
onSubmit(validate) {
  this.user.signup(validate.form.value).subscribe(
    (response: any) => successCallback(response.data),
    (response: any) => {
      for (let error: any of response.errors) {
        let errorObject: any = {};
        errorObject[error.name] = true;
        validate.addErrors(error.field, errorObject);
      }
    }
  );
}
```

As you can see, you can access to the form instance from `validate.form`.

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
