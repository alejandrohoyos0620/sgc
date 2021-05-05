import { Injectable } from '@angular/core';
import { Establishment } from '@core/models/establishment.model';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor() { }
  saveEstablishment(tokenPayload: any): any{
    const establishment = tokenPayload.establishment;
    localStorage.setItem('establishment', JSON.stringify(establishment));
  }
  getEstablishment(): Establishment {
    const establishment = localStorage.getItem('establishment');
    const establishmentDecode: Establishment = JSON.parse(establishment);
    return establishmentDecode;
  }
  getEstablishmentId(): number {
    const establishment = localStorage.getItem('establishment');
    const establishmentDecode: Establishment = JSON.parse(establishment);
    return Number(establishmentDecode.id);
  }
}
