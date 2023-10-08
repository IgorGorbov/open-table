import React, { PropsWithChildren } from "react";

import { Navbar } from "@/shared/ui";

export const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="bg-gray-100 min-h-screen w-screen">
        <div className="max-w-screen-2xl m-auto bg-white">
          <Navbar />
          {children}
        </div>
      </main>
    </>
  );
};
