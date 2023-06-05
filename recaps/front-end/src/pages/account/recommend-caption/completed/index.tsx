import { renderMainLayout } from "@/layout/MainLayout/MainLayout";
import React, { FC } from "react";
import { ComponentStatic } from "@/helper/common";
import CompleteStep from "@/container/Recommend-Caption/CompleteStep";
import Head from "next/head";

const CompleteStepPage: FC & ComponentStatic = () => {
  return (
    <>
      <Head>
        <title>Recommend Captions</title>
      </Head>
      <CompleteStep />
    </>
  );
};

CompleteStepPage.renderLayout = renderMainLayout;

export default CompleteStepPage;
