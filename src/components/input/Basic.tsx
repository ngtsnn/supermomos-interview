import clsx from "clsx";
import React, { forwardRef } from "react";

export type IInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = forwardRef<HTMLInputElement, IInput>(({ className = "", ...rest }, ref) => {
  return (
    <input
      className={clsx(
        "px-1 rounded-md font-bold placeholder:font-bold placeholder:text-black outline-none",
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});
