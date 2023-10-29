import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

export const AuthInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className, errorMessage, ...rest }, ref) => {
    return (
      <>
        <input
          ref={ref}
          type="text"
          className={classNames("border rounded p-2 py-3 w-[49%]", className)}
          {...rest}
        />
        {errorMessage && (
          <span className="text-sm text-red-500">{errorMessage}</span>
        )}
      </>
    );
  }
);

AuthInput.displayName = "AuthInput";
