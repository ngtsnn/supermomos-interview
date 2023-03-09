import React from "react";

import { Logo } from "@components";
import { NavBar } from "@components/nav";

export const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center py-6">
      <Logo />
      <NavBar />
    </div>
  );
};
