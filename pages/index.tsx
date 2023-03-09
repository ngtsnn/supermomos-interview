import React, { useState } from "react";
import { Social } from "src/interfaces/social";
import CreateForm from "src/features/socials/components/CreateForm";
import { BannerProvider } from "src/context/BannerContext";
import SocialBlog from "@features/socials/components/SocialBlog";

const Home: React.FC = () => {
  const [social, setSocial] = useState<Social>();

  if (social) {
    return <SocialBlog social={social} />;
  }
  return (
    <BannerProvider>
      <CreateForm setSocial={setSocial} />
    </BannerProvider>
  );
};

export default Home;
