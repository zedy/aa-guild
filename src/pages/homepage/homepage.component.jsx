// libs
import React from "react";

// components
import DMList from "../../components/hp/dm-list.component";

import HpHero from "../../components/hp/hero.component";

const HomePage = () => {
  return (
    <div className="homepage">
      <HpHero />
      <DMList />      
    </div>
  );
};

export default HomePage;
