import { FC, ReactNode } from "react";

export const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-primaryGradient">
      <div className="container">{children}</div>
    </div>
  );
};
