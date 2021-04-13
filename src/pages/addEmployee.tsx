import { GetServerSideProps } from "next";
import React, { useCallback, useEffect } from "react";
import { APOLLO_STATE_PROP_NAME, initializeApollo } from "../../lib/apolloClient";
import AppBar from "../components/AppBar/AppBar";
import { GET_ALL_COMPANIES, iGetAllCompanies } from "../graphql/queries/company";
import { Form, Input, Button, Select, message } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { iCreateEmployee, MUTATION_CREATE_EMPLOYEE } from "../graphql/queries/employee";

export default function AddEmployee() {
  const [form] = Form.useForm();

  const { data: data_allCompanies, error: error_allCompanies } = useQuery<iGetAllCompanies>(GET_ALL_COMPANIES);
  const [createEmployee, { data, error }] = useMutation<iCreateEmployee>(MUTATION_CREATE_EMPLOYEE);

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
    <div>
      <AppBar />
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit} form={form}>
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
        <Form.Item label="CPF" name="cpf" rules={[{ required: true, message: "Please provide the employee's CPF" }]}>
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
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
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