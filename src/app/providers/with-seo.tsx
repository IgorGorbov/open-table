import { ComponentType } from "react";
import { NextSeo } from "next-seo";

export const withSeo =
  <T extends object>(Component: ComponentType<T>) =>
  (props: T) => (
    <>
      <NextSeo
        nofollow
        noindex
        title="OpenTable"
        description="Make online reservations, read restaurant reviews from diners, and earn points towards free meals."
        openGraph={{
          title: "OpenTable - make online reservations",
          description: "OpenTable - make online reservations",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Make online reservations, read restaurant reviews from diners, and earn points towards free meals.",
          },
          {
            name: "viewport",
            content: "width=device-width,initial-scale=1",
          },
          {
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <Component {...props} />
    </>
  );
