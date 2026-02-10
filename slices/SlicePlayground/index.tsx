"use client";

import { FC, use } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@prismicio/react";
import { FadeIn } from "@/components/FadeIn";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { Switch } from "@/components/Switch";
import { Stage } from "@react-three/drei";

/**
 * Props for `SlicePlayground`.
 */
export type SlicePlaygroundProps =
  SliceComponentProps<Content.SlicePlaygroundSlice>;

/**
 * Component for "SlicePlayground" Slices.
 */
const SlicePlayground: FC<SlicePlaygroundProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
      innerClassName="flex flex-col justify-center "
    >
      <FadeIn>

        <div className="font-bold-slanted text-6xl md:text-8xl uppercase scroll-pt-6">
          <PrismicRichText field={slice.primary.heanding} />
        </div>

        <div className="mb-6 max-w-4xl text-xl text-pretty">
          <PrismicRichText field={slice.primary.description} />
        </div>

        <FadeIn targetChildren className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2">
          {slice.primary.switches.map((item) => isFilled.contentRelationship(item.switch) ? (
            <SharedCanvas key={item.switch.uid} color={item.switch} />
          ) : null)}
        </FadeIn>

      </FadeIn>

    </Bounded>
  );
};

export default SlicePlayground;

type SharedCanvasProps = {
  color: Content.SlicePlaygroundSliceDefaultPrimarySwitchesItem["switch"];
}
const SharedCanvas: FC<SharedCanvasProps> = ({ color }: SharedCanvasProps) => {
  if (!isFilled.contentRelationship(color) || !color.data) {
    return null;
  }

  const colorName = color.uid as "red" | "brown" | "blue" | "black";
  const { color: hexColor, name } = color.data;
  const bgColor = {
    blue: "bg-sky-950",
    red: "bg-red-950",
    brown: "bg-amber-950",
    black: "bg-gray-900",
  }[colorName]

  return (
    <div className="group relative min-h-96 overflow-hidden rounded-3xl select-none">
      {/* Text Button */}
      {/* Canvas */}

      <Canvas camera={{position:[1.5, 2, 0], fov:7}}>
        <Stage adjustCamera intensity={0.5} shadows={"contact"} environment="city">
          <Switch rotation={[0, Math.PI / 4, 0]} color={colorName} hexColor={hexColor || ""} />
        </Stage>
      </Canvas>

      <div className={clsx("font-black-slanted absolute inset-0 -z-10 grid place-items-center text-8xl uppercase", bgColor)}>
        <svg className="pointer-events-none h-auto w-full" viewBox="0 0 75 100">
          <text x="0" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={18} className="font-black-slanted fill-white/30 uppercase mix-blend-overlay group-hover:fill-white/100 motion-safe:transition-all motion-safe:duration-700 ">
            {Array.from({ length: 8 }, (_, i) => (
              <tspan key={i} x={`${(i + 1) * 10}%`} dy={i == 0 ? -40 : 14}>
                {colorName}
                {colorName}
                {colorName}
                {colorName}
              </tspan>
            ))}
          </text>
        </svg>
      </div>
    </div>
  )
}