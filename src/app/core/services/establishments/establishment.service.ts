import { Injectable } from '@angular/core';
import { Establishment } from '@core/models/establishment.model';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor() { }
  saveEstablishment(tokenPayload: any){
    const establishment = tokenPayload.establishment;
    localStorage.setItem('establishment', JSON.stringify(establishment));
  }
  getEstablishment(): Establishment {
    let establishment = localStorage.getItem('establishment');
    let establishmentDecode:Establishment = JSON.parse(establishment);
    return establishmentDecode;
  }
  getEstablishmentId(): number {
    let establishment = localStorage.getItem('establishment');
    let establishmentDecode:Establishment = JSON.parse(establishment);
    return Number(establishmentDecode.id);
  }
}
