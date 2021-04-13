import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Company {
    id: ID!
    name: String!
    tradingName: String!
    cnpj: String!
    address: String!
    chosenBenefits: [String]!
  }
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    cpf: String!
    email: String!
    employer: Company!
  }

  type Query {
    helloWorld: String!
    getCompany(id: String, name: String, tradingName: String, cnpj: String): Company
    getAllCompanies: [Company]
  }

  type Mutation {
    createCompany(
      name: String!
      tradingName: String!
      cnpj: String!
      address: String!
      chosenBenefits: [String]!
    ): Company
  }
`;
