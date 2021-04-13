import React, { useCallback } from "react";
import { Menu } from "antd";

import { SearchOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";

export default function AppBar() {
  const router = useRouter();
  const currentRoute = router.route;
  const handleClick = useCallback(
    (event) => {
      if (event.key === currentRoute) return;
      router.replace(event.key);
    },
    [router]
  );

  return (
    <Menu onClick={handleClick} selectedKeys={[currentRoute]} mode="horizontal">
      <Menu.Item key="/" icon={<SearchOutlined />}>
        Search Employees
      </Menu.Item>
      <Menu.Item key="/newCompany" icon={<HomeOutlined />}>
        New Company
      </Menu.Item>
      <Menu.Item key="/newEmployee" icon={<UserOutlined />}>
        New Employee
      </Menu.Item>
    </Menu>
  );
}
