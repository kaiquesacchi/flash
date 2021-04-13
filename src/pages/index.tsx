import { useLazyQuery, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { APOLLO_STATE_PROP_NAME, initializeApollo } from "../../lib/apolloClient";
import { GET_ALL_COMPANIES, iGetAllCompanies } from "../graphql/queries/company";
import { GET_EMPLOYEES_BY_COMPANY, iEmployee, iGetEmployeesByCompany } from "../graphql/queries/employee";
import EmployeeTable from "../components/EmployeeTable/EmployeeTable";
import { Select, Typography } from "antd";
import AppBar from "../components/AppBar/AppBar";
const { Title } = Typography;

export default function Home() {
  const { data: data_allCompanies, error: error_allCompanies } = useQuery<iGetAllCompanies>(GET_ALL_COMPANIES);
  const [getEmployees, { data: data_employees, error: error_employees }] = useLazyQuery<iGetEmployeesByCompany>(
    GET_EMPLOYEES_BY_COMPANY
  );

  const [employees, setEmployees] = useState<iEmployee[]>([]);
  const handleSelect = (value: string) => {
    getEmployees({
      variables: {
        companyID: value,
      },
    });
  };

  useEffect(() => {
    setEmployees(data_employees?.getEmployeesByCompany || []);
  }, [data_employees]);

  return (
    <div>
      <AppBar />
      <Title>Search Employees</Title>
      <Select
        style={{ width: 200 }}
        showSearch
        filterOption={(input, option) => {
          const label = option?.label as string;
          return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
        onChange={handleSelect}
        options={data_allCompanies?.getAllCompanies.map((company) => ({
          label: company.name,
          value: company.id,
        }))}
      />

      <EmployeeTable data={employees} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query<iGetAllCompanies>({
      query: GET_ALL_COMPANIES,
    });
  } catch {}
  return {
    props: { [APOLLO_STATE_PROP_NAME]: apolloClient.cache.extract() },
  };
};
