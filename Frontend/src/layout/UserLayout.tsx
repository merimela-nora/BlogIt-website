import React from "react";
import { Outlet } from "react-router-dom";
import HeaderUser from "../components/HeaderUser";

const UserLayout: React.FunctionComponent = () => {
  return (
    <>
      <HeaderUser/>
      <Outlet />
    </>
  );
};

export default UserLayout;
