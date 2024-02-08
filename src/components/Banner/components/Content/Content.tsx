import { useEffect, useRef } from 'react';
import gsap from "gsap";
import { Data } from "../../../../interfaces/Data";

type ContentProps = {
  activeData: Data;
};

export const Content = ({ activeData }: ContentProps) => {
  return (
    <div className="select-none w-full h-2/5 flex justify-center items-center lg:w-1/2 lg:h-full lg:justify-end">
      <div className="flex justify-start flex-col items-start w-2/3">
        <h1 className="text-left text-5xl font-bold mb-1 w-full relative p-1 md:text-[7vw] md:mb-2">
          <p className="text">{activeData.text}</p>
        </h1>
        <h6 className="text-left text-2xl font-regular mb-6 w-full p-1 md:text-4xl">
          <p className="text">{activeData.subText}</p>
        </h6>
        <p className="w-full text-xs font-medium text-left mb-8 p-1 md:text-base md:mb-12">
          <p className="text">{activeData.description}</p>
        </p>
        <div className="relative overflow-hidden p-4">
          <button className="text cursor-pointer button rounded-2xl outline-none px-8 py-2 font-medium bg-[#4A6E6A] md:px-10 md:py-4">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}