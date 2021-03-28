import { Establishment } from "./establishment.model";

export interface Employee {
    id: number;
    fullName: string;
    role: string;
    address: string;
    phone: string;
    email: string;
    establishment: Establishment;
    password: string;
}
