import { renderMainLayout } from "@/layout/MainLayout/MainLayout";
import React, { FC } from "react";
import { ComponentStatic } from "@/helper/common";
import RecommendCaption from "@/container/Recommend-Caption";
import Head from "next/head";

const RecommendCaptionPage: FC & ComponentStatic = () => {
  return (
    <>
      <Head>
        <title>Recommend Caption</title>
      </Head>
      <RecommendCaption />
    </>
  );
};

RecommendCaptionPage.renderLayout = renderMainLayout;

export default RecommendCaptionPage;
