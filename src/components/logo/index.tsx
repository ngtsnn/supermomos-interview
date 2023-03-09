import React from "react";
import Image from "next/image";
import BrandLogo from "@assets/logos/logo.png";

export const Logo: React.FC = () => {
  return <Image src={BrandLogo} alt="nextjs" width="200" height="36" />;
};
