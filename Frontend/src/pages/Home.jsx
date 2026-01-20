import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSecction";
import MapSection from "../components/Map";
import SearchBar from "../components/SearchBar";
import StatsBar from "../components/Stats";
import VendorCategories from "../components/VendorCategories ";
import FeaturedVendors from "../components/FeaturedVendors";
import {useAuth} from "../store/auth";
import Navbar from "../components/Navbar";

function Home() {

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-linear-to-b from-[#E6F0FF] via-[#CFE1FF] to-[#FFFFFF]">
        <HeroSection />
        <SearchBar />
        <MapSection />
        <StatsBar />
        <VendorCategories />
        <FeaturedVendors/>
      </div>
    </>
  );
}

export default Home;
