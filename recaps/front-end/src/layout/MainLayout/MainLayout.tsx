import React, { ReactElement, FC, useMemo, useCallback } from 'react';
import Header from '../Header/Header';

interface Props {
  children: ReactElement;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header/>
      <div style={{marginTop: 94}}>
      {children}
      </div>
    </>
  );
};

interface MainLayoutProps {
  children: ReactElement;
}

export function renderMainLayout<Props = any>({ children }: MainLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
