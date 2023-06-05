import { ComponentStatic } from "@/helper/common";
// import { store } from "@/store/store";
import "@/styles/globals.scss";
import { NextComponentType, NextPageContext } from "next";
import type { AppContext, AppProps } from "next/app";
import { AppPropsType } from "next/dist/shared/lib/utils";
import { useMemo } from "react";
import { Provider } from "react-redux";

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
