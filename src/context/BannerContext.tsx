import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";

const BannerContext = createContext({
  banner: "",
  setBanner: (banner: string) => {
    banner;
  },
});

export const BannerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [banner, setBanner] = useState<string>("");
  return <BannerContext.Provider value={{ banner, setBanner }}>{children}</BannerContext.Provider>;
};

export const useBanner = () => {
  return useContext(BannerContext);
};
