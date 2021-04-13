import React, { useCallback, useEffect } from "react";
import AppBar from "../components/AppBar/AppBar";

import { Form, Input, Button, Select, message } from "antd";
import { useMutation } from "@apollo/client";
import { iCreateCompany, MUTATION_CREATE_COMPANY } from "../graphql/queries/company";

const benefits = [
  {
    label: "VR",
    value: "vr",
  },
  {
    label: "VT",
    value: "vt",
  },
  {
    label: "GymPass",
    value: "gymPass",
  },
];

export default function addCompany() {
  const [form] = Form.useForm();
  const [createCompany, { data, error }] = useMutation<iCreateCompany>(MUTATION_CREATE_COMPANY);
  const handleSubmit = useCallback((values) => {
    createCompany({ variables: values });
  }, []);

  useEffect(() => {
    if (!data?.createCompany.name) return;
    message.success(`${data.createCompany.name} added successfully!`);
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
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please provide the company's name" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Trading Name"
          name="tradingName"
          rules={[{ required: true, message: "Please provide the company's trading name" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="CNPJ" name="cnpj" rules={[{ required: true, message: "Please provide the company's CNPJ" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please provide the company's address" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Benefits"
          name="chosenBenefits"
          rules={[{ required: true, message: "Please provide the company's chosen benefits" }]}>
          <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select" options={benefits} />
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
