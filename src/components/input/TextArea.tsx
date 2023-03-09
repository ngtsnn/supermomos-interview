import clsx from "clsx";
import React, { forwardRef } from "react";

export type ITextArea = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
  ({ className = "", ...rest }, ref) => {
    return (
      <textarea ref={ref} className={clsx("px-1 rounded-md outline-none", className)} {...rest} />
    );
  },
);
