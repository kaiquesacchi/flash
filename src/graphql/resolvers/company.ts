import companies from "../../models/companies";
import { iApolloContext } from "../../pages/api/graphql";

/* ------------------------------------------- Get company by an attribute ------------------------------------------ */

export function getCompany(_parent: any, args: any, _context: iApolloContext) {
  return;
}

/* ------------------------------------------ Get all companies registered ------------------------------------------ */

export async function getAllCompanies(_parent: any, _args: any, context: iApolloContext) {
  const allCompanies = await companies.find();
  console.log(allCompanies);
  return allCompanies;
}

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
