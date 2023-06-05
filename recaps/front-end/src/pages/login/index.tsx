import React, { FC } from "react";
import { ComponentStatic } from "@/helper/common";
import { renderLayoutLogin } from "@/layout/LayoutLogin/LayoutLogin";
import Login from "@/container/Login";
import Head from "next/head";

const LoginPage: FC & ComponentStatic = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </>
  );
};
LoginPage.renderLayout = renderLayoutLogin;

export default LoginPage;
