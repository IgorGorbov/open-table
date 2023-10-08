import type { AppProps } from "next/app";

import { BaseLayout } from "@/widgets";
import { withProviders } from "@/app/providers";

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <BaseLayout>{getLayout(<Component {...pageProps} />)}</BaseLayout>;
};

export default withProviders(App);
