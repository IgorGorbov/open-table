import React, { PropsWithChildren, useState } from "react";

import { Navbar } from "@/shared/ui";
import { SignInButton, SignUpButton } from "@/features/auth";

export const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="bg-gray-100 min-h-screen w-screen">
        <div className="max-w-screen-2xl m-auto bg-white">
          <Navbar>
            <SignInButton />
            <SignUpButton />
          </Navbar>
          {children}
        </div>
      </main>
    </>
  );
};
