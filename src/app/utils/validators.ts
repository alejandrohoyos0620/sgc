import { AbstractControl } from '@angular/forms';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MyValidators {

    static isPriceValid(control: AbstractControl): any {
        const value = control.value;
        console.log(value);
        if (value > 10000) {
            return { price_invalid: true };
        }
        return null;
    }

}

export const validateIfMatch: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('confirmPassword');

  return password.value === confirmarPassword.value ? null : { 'noSonIguales': true };
};
