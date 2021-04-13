import { gql } from "@apollo/client";

/* -------------------------------------------- Get employees by company -------------------------------------------- */
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

export interface iEmployee {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
}

export interface iGetEmployeesByCompany {
  getEmployeesByCompany: iEmployee[];
}

/* ------------------------------------------------ Create a employee ----------------------------------------------- */
export const MUTATION_CREATE_EMPLOYEE = gql`
  mutation($firstName: String!, $lastName: String!, $cpf: String!, $email: String!, $companyID: String!) {
    createEmployee(firstName: $firstName, lastName: $lastName, cpf: $cpf, email: $email, companyID: $companyID) {
      firstName
      lastName
      cpf
      email
      companyID
    }
  }
`;

export interface iCreateEmployee {
  createEmployee: {
    firstName: string;
    lastName: string;
    cpf: string;
    email: string;
    companyID: string;
  };
}
