import { createCompany, getAllCompanies } from "./company";
import { createEmployee, getEmployeesByCompany } from "./employee";

export const resolvers = {
  Query: {
    getAllCompanies,
    getEmployeesByCompany,
  },
  Mutation: {
    createCompany,
    createEmployee,
  },
};
