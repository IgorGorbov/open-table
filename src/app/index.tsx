import React from "react";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";

import { BaseLayout } from "@/widgets";
import { withProviders } from "@/app/providers";

type AppComponent = NextComponentType<NextPageContext, any, any> & {
  getLayout: (page: React.ReactNode, props: any) => React.ReactNode;
};

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout =
    (Component as AppComponent).getLayout ?? ((page: React.ReactNode) => page);

  return (
    <BaseLayout>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </BaseLayout>
  );
};

export default withProviders(App);
