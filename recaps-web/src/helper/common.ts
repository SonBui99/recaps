import { NextPageContext } from "next";
import { ReactElement } from "react";

export interface ComponentStatic {
    renderLayout?: ({ children }: { children: ReactElement }) => ReactElement;
    getInitialProps?: (ctx: NextPageContext) => Promise<any> | any;
  }
  