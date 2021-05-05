import { AbstractControl } from '@angular/forms';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MyValidators {

    static isPriceValid(control: AbstractControl): any {
        const value = control.value;
        if (value > 10000) {
            return { price_invalid: true };
        }
        return null;
    }

}

export const validateIfMatch: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('confirmPassword');
  return password.value === confirmarPassword.value ? null : { noSonIguales: true };
};

export const errorMessages: { [key: string]: string } = {
    patternFName: 'El campo no puede tener números',
    patternLName: 'El campo no puede tener números',
    sub: 'El campo no puede tener números',
    email: 'En este campo debe haber un correo(usuario@dominio)',
    confirmEmail: 'Email addresses must match',
    lengthPassword: 'La contraseña debe ser entre 8 y 15 caracteres',
    patternPhone: 'El campo sólo admite números y caracteres como (+,-) o espacios',
    lengthPhone: 'El teléfono debe ser entre 7 y 15 caracteres',
    confirmPassword: 'Las contraseñas no coinciden',
    required: 'El campo es requerido',
    patternPassword: 'La contraseña debe contener mínimo una letra minúscula y una mayúscula',
    city: 'El campo no puede tener números',
};
