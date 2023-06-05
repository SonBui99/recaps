import { renderMainLayout } from "@/layout/MainLayout/MainLayout";
import React, { FC } from "react";
import { ComponentStatic } from "@/helper/common";
import Step0 from "@/container/Recommend-Caption/Step0";
import RecommendCaption from "@/container/Recommend-Caption";

const RecommendCaptionPage: FC & ComponentStatic = () => {
  return (
    <>
      <RecommendCaption />
    </>
  );
};

RecommendCaptionPage.renderLayout = renderMainLayout;

export default RecommendCaptionPage;
