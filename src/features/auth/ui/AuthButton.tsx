import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const AuthButton: React.FC<Props> = (props) => {
  return (
    <button
      type="submit"
      disabled
      className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-grey-200"
      {...props}
    />
  );
};
