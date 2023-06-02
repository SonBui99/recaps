import Home from "@/container/Home";
import { renderMainLayout } from "@/layout/MainLayout/MainLayout";
import React, { FC } from "react";
import Head from "next/head";
import { ComponentStatic } from "@/helper/common";
import Explore from "@/container/Explore";

const ExplorePage: FC & ComponentStatic = () => {
  return (
    <>
      <Head>
        <title>Recap - Explore</title>
      </Head>
      <Explore />
    </>
  );
};

ExplorePage.renderLayout = renderMainLayout;

export default ExplorePage;
