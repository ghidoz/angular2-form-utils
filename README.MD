# Angular 2 Form Utils

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide) [![Dependency Status](https://david-dm.org/ghidoz/angular2-form-utils.svg)](https://david-dm.org/ghidoz/angular2-form-utils) [![devDependency Status](https://david-dm.org/ghidoz/angular2-form-utils/dev-status.svg)](https://david-dm.org/ghidoz/angular2-form-utils#info=devDependencies)

This library contains some useful components and service, that will help you while managing and validating Angular 2 Forms:

 - [Form errors list](#form-errors-list)

## Getting started

### Installation

To install this library, run:
```bash
$ npm install angular2-form-utils --save
```

### Form Errors List

Show a list of error messages under your form, like:

> **Username**: is required
> **Password**: must be at least 8 characters long

#### How to use
 
Add a template reference variable to your ngForm:

```html
<form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)" #f="ngForm">
...
</form>
```

Add the `<errors>`component inside your form, passing the variable:

```html
<errors [form]="f"></errors>
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
