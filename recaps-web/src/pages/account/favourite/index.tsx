import { renderMainLayout } from "@/layout/MainLayout/MainLayout";
import React, { FC } from "react";
import { ComponentStatic } from "@/helper/common";
import Recommendation from "@/container/Recommendation";
import Favourite from "@/container/Favourite";
import Head from "next/head";

const FavouritePage: FC & ComponentStatic = () => {
  return (
    <>
      <Head>
        <title>Favourite</title>
      </Head>
      <Favourite />
    </>
  );
};

FavouritePage.renderLayout = renderMainLayout;

export default FavouritePage;
