import React from "react";
import NavBar from "./NavBar";
import MainContent from "./MainContent";

function HomePage() {
  return (
    <div className="container">
      <NavBar></NavBar>
      <MainContent></MainContent>
    </div>
  );
}

export default HomePage;
