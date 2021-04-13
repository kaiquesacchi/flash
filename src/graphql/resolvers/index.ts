import { getCompany, getAllCompanies, createCompany } from "./company";

export const resolvers = {
  Query: {
    getCompany,
    getAllCompanies,
  },
  Mutation: {
    createCompany,
  },
};
