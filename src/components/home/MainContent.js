import React from "react";
import Carousel from "./Carousel";
import Service from "./Service";
import About from "./About";
import Footer from "./Footer";

function MainContent() {
  return (
    <main>
      <Carousel></Carousel>
      <Service></Service>
      <About></About>
      <Footer></Footer>
    </main>
  );
}

export default MainContent;
