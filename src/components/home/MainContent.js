import React from "react";
import Carousel from "./Carousel";
import Service from "./Service";
import About from "./About";
import Footer from "./Footer";
import Location from "./Location";

function MainContent() {
  return (
    <main>
      <Carousel></Carousel>
      <Service></Service>
      <About></About>
      <Location></Location>
      <Footer></Footer>
    </main>
  );
}

export default MainContent;
