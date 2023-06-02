import { renderMainLayout } from "@/layout/MainLayout/MainLayout";
import React, { FC } from "react";
import { ComponentStatic } from "@/helper/common";
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
