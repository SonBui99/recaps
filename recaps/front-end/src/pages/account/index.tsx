import { renderMainLayout } from "@/layout/MainLayout/MainLayout";
import React, { FC } from "react";
import { ComponentStatic } from "@/helper/common";
import HomeUser from "@/container/HomeUser";
import Head from "next/head";

const AcountPage: FC & ComponentStatic = () => {
  return (
    <>
      <Head>
        <title>Collection</title>
      </Head>
      <HomeUser />
    </>
  );
};

AcountPage.renderLayout = renderMainLayout;

export default AcountPage;
