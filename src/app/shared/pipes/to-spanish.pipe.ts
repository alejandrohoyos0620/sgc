import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toSpanish'
})
export class ToSpanishPipe implements PipeTransform {

  transform(value: string): unknown {
    switch (value) {
      case 'delivery':
        return 'Domicilio';
      case 'pickup':
        return 'Recogida';
      case 'notApproved':
        return 'Sin Aprobar';
      case 'approved':
        return 'Aprobado';
      case 'course':
        return 'En Curso';
      case 'finished':
        return 'Finalizado';
      default:
        return value;
    }
  }

}
