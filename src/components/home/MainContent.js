import React from "react";
import Carousel from "./Carousel";
import Service from "./Service";
import About from "./About";

function MainContent() {
  return (
    <main>
      <Carousel></Carousel>
      <Service></Service>
      <About></About>
    </main>
  );
}

export default MainContent;
