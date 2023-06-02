import React, { ReactElement, FC } from "react";
import HeaderLogin from "../HeaderLogin";

interface Props {
  children: ReactElement;
}

const LayoutLogin: FC<Props> = ({ children }) => {
  return (
    <>
      <HeaderLogin />
      {children}
    </>
  );
};

interface LayoutLoginProps {
  children: ReactElement;
}

export function renderLayoutLogin<Props = any>({ children }: LayoutLoginProps) {
  return <LayoutLogin>{children}</LayoutLogin>;
}
