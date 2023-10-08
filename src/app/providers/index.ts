import compose from "compose-function";
import { withSeo } from "@/app/providers/with-seo";

export const withProviders = compose(withSeo);
