import React, { PropsWithChildren } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (isOpen) {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div
          className="w-full h-full bg-[#00000080] top-0 absolute"
          onClick={onClose}
        />
        <div className="sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 bg-[#fff] rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute">
          {children}
        </div>
      </div>
    );
  }

  return null;
};
