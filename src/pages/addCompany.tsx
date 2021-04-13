import React, { useCallback, useEffect } from "react";
import AppBar from "../components/AppBar/AppBar";

import { Form, Input, Button, Select, message, Card, Divider, Row, Col, Space } from "antd";
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
    <Space size={20} direction="vertical" style={{ width: "100vw" }}>
      <AppBar />
      <Row justify="center">
        <Col xs={24} sm={18} md={18} lg={12} xl={12}>
          <Card>
            <Form onFinish={handleSubmit} form={form} layout="vertical">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please provide the company's name" }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Trading Name"
                name="tradingName"
                rules={[{ required: true, message: "Please provide the company's trading name" }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="CNPJ"
                name="cnpj"
                rules={[{ required: true, message: "Please provide the company's CNPJ" }]}>
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
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  options={benefits}
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
  );
}
