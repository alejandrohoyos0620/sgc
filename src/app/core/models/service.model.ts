import { Establishment } from "./establishment.model"

export interface Service {
    id: string;
    name: string;
    isDeliverable: boolean;
    description: string;
    isEnable: boolean;
    establishment: Establishment;
}
