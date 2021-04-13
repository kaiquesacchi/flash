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
