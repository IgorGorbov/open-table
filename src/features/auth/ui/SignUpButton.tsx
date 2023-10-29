import React from "react";
import { useModal } from "@/shared/hooks";

import { SignUpModal } from "./SignUpModal";

export const SignUpButton = () => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <>
      <button className="border text-black p-1 px-4 rounded" onClick={onOpen}>
        Sign up
      </button>
      <SignUpModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
