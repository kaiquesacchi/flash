import employees from "../../models/employees";
import { iApolloContext } from "../../pages/api/graphql";

/* ----------------------------------------------- Create new employee ---------------------------------------------- */
interface iCreateEmployee {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  employerID: string;
}

export function createEmployee(_parent: any, args: iCreateEmployee, _context: iApolloContext) {
  const newEmployee = new employees(args);
  newEmployee.save();
  return newEmployee;
}

/* ---------------------------------------- Get all employees from a company ---------------------------------------- */
interface iGetEmployeesByCompany {
  companyID: string;
}
export async function getEmployeesByCompany(
  _parent: any,
  { companyID }: iGetEmployeesByCompany,
  _context: iApolloContext
) {
  const allEmployees = await employees.find({
    companyID,
  });
  return allEmployees;
}
