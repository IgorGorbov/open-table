import compose from "compose-function";

import { withSeo } from "./with-seo";
import { withAuth } from "./with-auth";

export const withProviders = compose(withSeo, withAuth);
