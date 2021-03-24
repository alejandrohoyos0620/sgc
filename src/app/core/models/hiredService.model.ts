import { Customer } from "./customer.model"
import { Device } from "./device.model"
import { Employee } from "./employee.model"
import { Service } from "./service.model"

export interface hiredService {
    id: string;
    service:Partial<Service>;
    device: Device;
    customer: Partial<Customer>;
    repairman: Partial<Employee>;
    status: string;
    createdAt: string;
}
