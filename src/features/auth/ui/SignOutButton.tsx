import React from "react";

import { useAuth } from "../hooks";

export const SignOutButton = () => {
  const { signOut } = useAuth();

  return (
    <button
      className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
      onClick={signOut}
    >
      Sign out
    </button>
  );
};
