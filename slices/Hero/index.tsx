"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="text-white relative h-dvh text-shadow-black/30 text-shadow-lg blue-gradient-bg">

      <div className="hero-scene sticky pointer-events-none top-0 h-dvh w-full">

        <Canvas>
          <Scene />
        </Canvas>
        
      </div>

      <div className="hero-content absolute inset-x-0 top-0 h-dvh">

        <Bounded fullWidth className="absolute top-18 inset-x-0 md:top-24 md:left-[8vw]">
          <PrismicRichText field={slice.primary.heanding} components={{
            heading1: ({ children }) => (<h1 className="hero-heanding font-black-slanted text-6xl leanding-[0.8] uppercase sm:text-6xl lg:text-7xl">{children}</h1>)
          }} />
        </Bounded>

        <Bounded fullWidth className="hero-body absolute bottom-0 inset-x-0 md:right-[8vw] md:left-auto" /* innerClassName="flex flex-col gap-3" */>
          <div className="max-w-md flex flex-col gap-2">

            <PrismicRichText field={slice.primary.body} components={{
              heading2: ({ children }) => (
                <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-5xl">{children}</h2>
              )
            }} />
            <button className="font-bold-slanted group flex w-fit cursor-pointer items-center gap-1 rounded bg-[#01A7E1] px-3 py-1 text-2xl uppercase transition disabled:grayscale">
              {slice.primary.buy_button_text}
              <span className="group-hover:translate-x-1 transition">{">"}</span>
            </button>

          </div>
        </Bounded>

      </div>

    </section>
  );
};

export default Hero;
