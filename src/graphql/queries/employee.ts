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

export const MUTATION_CREATE_EMPLOYEE = gql`
  mutation($firstName: String!, $lastName: String!, $cpf: String!, $email: String!, $companyID: String!) {
    createEmployee(firstName: $firstName, lastName: $lastName, cpf: $cpf, email: $email, companyID: $companyID) {
      firstName
      lastName
    }
  }
`;

export interface iCreateEmployee {
  createEmployee: {
    firstName: string;
    lastName: string;
  };
}
