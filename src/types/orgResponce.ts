export interface Employee {
  id: string;
  name: string;
  position: string;
  age: number;
}

export interface Organization {
  id: string;
  name: string;
  location: string;
  employees: Employee[];
}

export interface OrganizationsResponse {
  organizations: Organization[];
}
