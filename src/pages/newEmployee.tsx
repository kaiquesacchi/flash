import { GetServerSideProps } from "next";
import React, { useCallback, useEffect } from "react";
import { APOLLO_STATE_PROP_NAME, initializeApollo } from "../../lib/apolloClient";
import AppBar from "../components/AppBar/AppBar";
import { GET_ALL_COMPANIES, iGetAllCompanies } from "../graphql/queries/company";
import { Form, Input, Button, Select, message, Space, Row, Col, Card, Divider } from "antd";
import { MutationUpdaterFn, useMutation, useQuery } from "@apollo/client";
import {
  GET_EMPLOYEES_BY_COMPANY,
  iCreateEmployee,
  iGetEmployeesByCompany,
  MUTATION_CREATE_EMPLOYEE,
} from "../graphql/queries/employee";
import Head from "next/head";

/** After a Mutation, the cache must be updated to include the new entry.
 *
 * @param cache ApolloClient cache
 * @param result Result of the mutation
 * @override ApolloCache
 */
const handleUpdate: MutationUpdaterFn<iCreateEmployee> = (cache, { data }) => {
  try {
    // Gets the new entry.
    const { createEmployee: newEmployee } = data as iCreateEmployee;
    // Gets the old cache.
    const allEmployees = cache.readQuery<iGetEmployeesByCompany>({
      query: GET_EMPLOYEES_BY_COMPANY,
      variables: { companyID: newEmployee.companyID },
    });
    if (!allEmployees) return; // Haven't been cached yet.
    const newCache = [...allEmployees.getEmployeesByCompany, newEmployee];
    cache.writeQuery({
      query: GET_EMPLOYEES_BY_COMPANY,
      variables: { companyID: newEmployee.companyID },
      data: { getEmployeesByCompany: newCache },
    });
  } catch {
    // Couldn't rewrite the cache. The page must be refreshed.
    message.warn("The page needs to be reloaded to display the new employee.");
  }
};

export default function AddEmployee() {
  const [form] = Form.useForm();

  const { data: data_allCompanies, error: error_allCompanies } = useQuery<iGetAllCompanies>(GET_ALL_COMPANIES);
  const [createEmployee, { data, error }] = useMutation<iCreateEmployee>(MUTATION_CREATE_EMPLOYEE, {
    update: handleUpdate,
  });

  const handleSubmit = useCallback((values) => {
    createEmployee({
      variables: values,
    });
  }, []);
  useEffect(() => {
    if (!data?.createEmployee.firstName) return;
    message.success(`${data.createEmployee.firstName} ${data.createEmployee.lastName} added successfully!`);
    form.resetFields();
  }, [data]);
  useEffect(() => {
    if (!error) return;
    message.error("Unexpected error. Please, try again later...");
  }, [error]);
  return (
    <>
      <Head>
        <title>New Employee</title>
      </Head>
      <Space size={20} direction="vertical" style={{ width: "100vw" }}>
        <AppBar />
        <Row justify="center">
          <Col xs={24} sm={18} md={18} lg={12} xl={12}>
            <Card>
              <Form onFinish={handleSubmit} form={form} layout="vertical">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "Please provide the employee's first name" }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Please provide the employee's last name" }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="CPF"
                  name="cpf"
                  rules={[{ required: true, message: "Please provide the employee's CPF" }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please provide the employee's email" }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Employer"
                  name="companyID"
                  rules={[{ required: true, message: "Please select the employer" }]}>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    options={data_allCompanies?.getAllCompanies.map((company) => ({
                      label: company.name,
                      value: company.id,
                    }))}
                    filterOption={(input, option) => {
                      const label = option?.label as string;
                      return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                    }}
                  />
                </Form.Item>
                <Divider />
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
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
