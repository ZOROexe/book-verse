import React from "react";
import { useEffect } from "react";
import Hero from "../components/Hero";
import RecentlyAdded from "../components/RecentlyAdded";
import Recommend from "../components/Recommend";
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-zinc-900 text-white px-10 py-8">
      <Hero />
      <RecentlyAdded />
      <Recommend />
    </div>
  );
};

export default Home;
