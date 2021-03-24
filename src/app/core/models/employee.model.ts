import { Establishment } from "./establishment.model";

export interface Employee {
    id: string;
    fullName: string;
    role: string;
    address: string;
    phone: string;
    email: string;
    establishment: Establishment;
    password: string;
}
