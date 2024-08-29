export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  phone: string;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  city: string;
  phone: string;
  description: string;
  employees: Employee[];
}

export interface OrganizationsResponse {
  organizations: Organization[];
}
