import React from "react";
import NavBar from "../components/Navbar";
import Service from "../components/Service";

import AboutUsHero from "../components/aboutUs/AboutUsHero";
import AboutUsTeam from "../components/aboutUs/AboutUsTeam";
import Footer from "../components/Footer";


const AboutPage = () => {
  return (
    <>
      <NavBar  position={"sticky"} zIndex={9999} top={0} />
      <AboutUsHero />
      <Service />
      <AboutUsTeam />
      <Footer />
    </>
  );
};

export default AboutPage;
