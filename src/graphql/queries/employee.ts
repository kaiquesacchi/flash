import { gql } from "@apollo/client";

export const GET_EMPLOYEES_BY_COMPANY = gql`
  query($companyID: String!) {
    getEmployeesByCompany(companyID: $companyID) {
      firstName
      lastName
      cpf
      email
    }
  }
`;

export interface iGetEmployeesByCompany {
  getEmployeesByCompany: iEmployee[];
}

export interface iEmployee {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
}
