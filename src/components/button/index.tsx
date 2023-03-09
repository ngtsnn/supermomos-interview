import clsx from "clsx";
import React from "react";

export type IButton = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<IButton> = ({ className = "", children, ...rest }) => {
  return (
    <button
      className={clsx(
        "flex items-center px-3 py-2 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 shadow-md",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
