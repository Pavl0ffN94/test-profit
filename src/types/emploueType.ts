import {Employee} from './orgResponce';

export interface UpdateEmployee {
  organizationId: string;
  employeeId: string;
  patch: Partial<Employee>;
}
