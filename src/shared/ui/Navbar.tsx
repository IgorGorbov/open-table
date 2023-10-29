import Link from "next/link";
import React, { PropsWithChildren } from "react";

export const Navbar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">{children}</div>
      </div>
    </nav>
  );
};
