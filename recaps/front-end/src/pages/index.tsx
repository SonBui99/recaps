import Home from "@/container/Home";
import { renderMainLayout } from "@/layout/MainLayout/MainLayout";
import React, { FC } from "react";
import { ComponentStatic } from "../helper/common";
import Head from "next/head";

const HomePage: FC & ComponentStatic = () => {
  return (
    <>
      <Head>
        <title>Recap - Home</title>
      </Head>
      <Home />
    </>
  );
};

HomePage.renderLayout = renderMainLayout;

export default HomePage;
