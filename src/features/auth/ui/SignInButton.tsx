import React from "react";
import { useModal } from "@/shared/hooks";

import { SignInModal } from "./SignInModal";

export const SignInButton = () => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <>
      <button
        className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
        onClick={onOpen}
      >
        Sign in
      </button>
      <SignInModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
