import { gql } from "@apollo/client";

export const GET_ALL_COMPANIES = gql`
  query {
    getAllCompanies {
      id
      name
    }
  }
`;

export interface iGetAllCompanies {
  getAllCompanies: {
    id: string;
    name: string;
  }[];
}

export const MUTATION_CREATE_COMPANY = gql`
  mutation($name: String!, $tradingName: String!, $cnpj: String!, $address: String!, $chosenBenefits: [String]!) {
    createCompany(
      name: $name
      tradingName: $tradingName
      cnpj: $cnpj
      address: $address
      chosenBenefits: $chosenBenefits
    ) {
      name
    }
  }
`;
export interface iCreateCompany {
  createCompany: {
    name: string;
  };
}
