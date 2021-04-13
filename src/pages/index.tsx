// React and NextJS.
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

// ApolloClient and GraphQL.
import { useLazyQuery, useQuery } from "@apollo/client";
import { APOLLO_STATE_PROP_NAME, initializeApollo } from "../../lib/apolloClient";
import { GET_ALL_COMPANIES, iGetAllCompanies } from "../graphql/queries/company";
import { GET_EMPLOYEES_BY_COMPANY, iEmployee, iGetEmployeesByCompany } from "../graphql/queries/employee";

// Ant Design.
import { Select, Card, Divider, Space, Row, Col, message } from "antd";

// Components.
import EmployeeTable from "../components/EmployeeTable/EmployeeTable";
import AppBar from "../components/AppBar/AppBar";

export default function Home() {
  const { data: data_allCompanies, error: error_allCompanies } = useQuery<iGetAllCompanies>(GET_ALL_COMPANIES);
  const [getEmployees, { data: data_employees, error: error_employees }] = useLazyQuery<iGetEmployeesByCompany>(
    GET_EMPLOYEES_BY_COMPANY
  );
  const [employees, setEmployees] = useState<iEmployee[]>([]);

  // Handlers.
  const handleSelect = (value: string) => {
    getEmployees({
      variables: {
        companyID: value,
      },
    });
  };

  // UseEffects.
  useEffect(() => {
    setEmployees(data_employees?.getEmployeesByCompany || []);
  }, [data_employees]);

  useEffect(() => {
    if (error_allCompanies) {
      message.error("Couldn't load the companies list. Please try again later...");
    }
    if (error_employees) {
      message.error("Couldn't load the companies' employee list. Please try again later...");
    }
  }, [error_allCompanies, error_employees]);

  return (
    <>
      <Head>
        <title>Search Employees</title>
      </Head>
      <Space size={20} direction="vertical" style={{ width: "100vw" }}>
        <AppBar />
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <Card>
              <Select
                placeholder="Select the Company"
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
              <Divider />
              <EmployeeTable data={employees} />
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query<iGetAllCompanies>({
      query: GET_ALL_COMPANIES,
    });
  } catch {} // If the query fails, the error will be added to the cache, so there is no need to handle it here.
  return {
    props: { [APOLLO_STATE_PROP_NAME]: apolloClient.cache.extract() },
  };
};
