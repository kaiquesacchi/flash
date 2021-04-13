import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "CPF",
    dataIndex: "cpf",
    key: "cpf",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

interface iProps {
  data: {
    firstName: string;
    lastName: string;
    cpf: string;
    email: string;
  }[];
}
export default function EmployeeTable({ data }: iProps) {
  return <Table columns={columns} dataSource={data} />;
}
