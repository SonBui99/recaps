import React, { FC } from "react";
import { ComponentStatic } from "@/helper/common";
import { renderLayoutLogin } from "@/layout/LayoutLogin/LayoutLogin";
import Register from "@/container/Register";
import Head from "next/head";

const RegisterPage: FC & ComponentStatic = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Register />
    </>
  );
};
RegisterPage.renderLayout = renderLayoutLogin;

export default RegisterPage;
