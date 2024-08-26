export interface Employee {
  id: number;
  name: string;
  position: string;
  age: number;
}

export interface Organization {
  id: number;
  name: string;
  location: string;
  employees: Employee[];
}

export interface OrganizationsResponse {
  organizations: Organization[];
}
