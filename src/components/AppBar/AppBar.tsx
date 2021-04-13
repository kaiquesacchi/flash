// React and NextJS.
import React, { useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import { MenuInfo } from "rc-menu/lib/interface";

// Ant Design.
import { Menu } from "antd";
import { SearchOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";

const routes = [
  {
    key: "/",
    label: "Search Employees",
    icon: <SearchOutlined />,
  },
  {
    key: "/newCompany",
    label: "New Company",
    icon: <HomeOutlined />,
  },
  {
    key: "/newEmployee",
    label: "New Employee",
    icon: <UserOutlined />,
  },
];

export default function AppBar() {
  const router = useRouter();
  const currentRoute = router.route;

  // Handlers.
  const handleClick = useCallback(
    (event: MenuInfo) => {
      if (event.key === currentRoute) return;
      router.replace(event.key as string);
    },
    [router]
  );

  return (
    <Menu onClick={handleClick} selectedKeys={[currentRoute]} mode="horizontal">
      {routes.map(({ key, label, icon }) => (
        <Menu.Item key={key} icon={icon}>
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );
}
