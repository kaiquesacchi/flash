import { gql } from "@apollo/client";

export const GET_ALL_COMPANIES = gql`
  query {
    getAllCompanies {
      name
      address
    }
  }
`;

export interface iGetAllCompanies {
  getAllCompanies: {
    name: string;
    address: string;
  };
}
