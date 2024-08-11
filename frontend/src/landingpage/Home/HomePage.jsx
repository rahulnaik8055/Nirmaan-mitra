import React from "react";
import Hero from "./Hero";
import WorkInfo from "./WorkInfo";
import EngineerInfo from "./EngineerInfo";
import Shop from "./Shop";

function HomePage() {
  return (
    <>
      <Hero />
      <EngineerInfo />
      <WorkInfo />
      <Shop />
    </>
  );
}

export default HomePage;
