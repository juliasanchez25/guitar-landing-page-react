import { useState, useRef, useEffect } from 'react';
import { Content } from './components/Content/Content';
import { data } from './data';
import { Data } from '../../interfaces/Data';
import { Canvas } from './components/Canvas/Canvas';
import gsap from 'gsap';

export const Banner = () => {
  const banner = useRef<HTMLElement | null>(null);
  const [activeData, setActiveData] = useState<Data>(data[0]);

  const handleSwatchClick = (item: Data) => {
    if (activeData.id !== item.id) setActiveData(item);
  };

  useEffect(() => {
    gsap.to(banner.current, {
      background: activeData.background,
      ease: 'power3.inOut',
      duration: 0.8,
    });

    gsap.to('.logo', {
      color: activeData.textColor,
      ease: 'power3.inOut',
      duration: 0.8,
    });
  });

  return (
    <section ref={banner} className="w-screen h-screen relative text-center">
      <header className="logo absolute my-2 ml-6 text-left text-2xl font-bold uppercase tracking-widest md:ml-28 lg:ml-[12vw] lg:my-8">
        Overdrive
      </header>
      <div className="w-full h-full flex justify-between items-center flex-col lg:flex-row-reverse">
        <Canvas
          activeData={activeData}
          swatchData={data}
          handleSwatchClick={handleSwatchClick}
        />
        <Content activeData={activeData} />
      </div>
    </section>
  );
};
