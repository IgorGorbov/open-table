import React from "react";
import type { AppProps } from "next/app";

import { BaseLayout } from "@/widgets";
import { withProviders } from "@/app/providers";

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  return (
    <BaseLayout>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </BaseLayout>
  );
};

export default withProviders(App);
