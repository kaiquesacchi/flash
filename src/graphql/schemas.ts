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
  }

  type Query {
    helloWorld: String!
    getAllCompanies: [Company]
    getEmployeesByCompany(companyID: String!): [Employee]
  }

  type Mutation {
    createCompany(
      name: String!
      tradingName: String!
      cnpj: String!
      address: String!
      chosenBenefits: [String]!
    ): Company
    createEmployee(firstName: String!, lastName: String!, cpf: String!, email: String!, companyID: String!): Employee
  }
`;
