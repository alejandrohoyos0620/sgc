import { Establishment } from "./establishment.model"

export interface Service {
    id: number;
    name: string;
    isDeliverable: number;
    description: string;
    isEnable: number;
    establishment: Establishment;
    price: number;
}
