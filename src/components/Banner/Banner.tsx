import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Header } from "../Header/Header";
import { Content } from "./components/Content/Content";
import { Swatches } from "./components/Swatches/Swatches";
import { data } from "./data";
import { Data } from "../../interfaces/Data";
import { Canvas } from "./components/Canvas/Canvas";

export const Banner = ()  => {
  const banner = useRef<HTMLElement | null>(null);
  const [activeData, setActiveData] = useState<Data>(data[0]);

  return (
    <section
      ref={banner}
      className="w-screen h-screen relative text-center"
    >
      <Header />
      <div className="w-full h-full flex justify-between items-center flex-col lg:flex-row-reverse">
        <Canvas activeData={activeData} />
        <Content activeData={activeData} />
      </div>
    </section>
  );
}