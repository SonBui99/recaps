import { ComponentStatic } from "@/helper/common";
import "@/styles/globals.scss";
import { NextComponentType, NextPageContext } from "next";
import type { AppContext, AppProps } from "next/app";
import { AppPropsType } from "next/dist/shared/lib/utils";
import { useMemo } from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }: AppProps & AppPropsType) => {
  const renderApp = useMemo(() => {
    const C = Component as NextComponentType<NextPageContext, any> &
      ComponentStatic;
    const { renderLayout } = C;
    if (renderLayout) {
      return renderLayout({ children: <C {...pageProps} /> });
    }
    return <C {...pageProps} />;
  }, [Component, pageProps]);
  return (
    <>
      {/* <Provider store={store}>{renderApp}</Provider> */}
      {renderApp}
      <ToastContainer
        hideProgressBar
        position="top-right"
        transition={Slide}
        autoClose={3000}
      />
    </>
  );
};

App.getInitialProps = ({ Component, ctx }: AppContext) => {
  return {
    pageProps: {
      ...(Component.getInitialProps ? Component.getInitialProps(ctx) : {}),
    },
  };
};

export default App;
