import { iApolloContext } from "../../pages/api/graphql";
import companies from "../../models/companies";

/* --------------------------------------------- Register a new company --------------------------------------------- */
interface iCreateCompany {
  name: string;
  tradingName: string;
  cnpj: string;
  address: string;
  chosenBenefits: string[];
}
export function createCompany(_parent: any, args: iCreateCompany, _context: iApolloContext) {
  const newCompany = new companies(args);
  newCompany.save();
  return newCompany;
}

/* ------------------------------------------ Get all companies registered ------------------------------------------ */
export async function getAllCompanies(_parent: any, _args: any, _context: iApolloContext) {
  const allCompanies = await companies.find();
  return allCompanies;
}
