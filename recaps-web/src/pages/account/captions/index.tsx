import { renderMainLayout } from "@/layout/MainLayout/MainLayout";
import React, { FC } from "react";
import { ComponentStatic } from "@/helper/common";
import Recommendation from "@/container/Recommendation";
import Head from "next/head";

const RecommendationPage: FC & ComponentStatic = () => {
  return (
    <>
      <Head>
        <title>Captions</title>
      </Head>
      <Recommendation />
    </>
  );
};

RecommendationPage.renderLayout = renderMainLayout;

export default RecommendationPage;
