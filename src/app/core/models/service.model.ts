import { Establishment } from "./establishment.model"

export interface Service {
    id: number;
    name: string;
    isDeliverable: boolean;
    description: string;
    isEnable: boolean;
    establishment: Establishment;
}
