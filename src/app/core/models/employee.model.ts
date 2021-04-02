import { Establishment } from "./establishment.model";

export interface Employee {
    id: number;
    sub: string;
    role: string;
    address: string;
    phone: string;
    email: string;
    establishment: Establishment;
    password: string;
}
