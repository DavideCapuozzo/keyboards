import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import clsx from "clsx";
import Image from "next/image";
import { text } from "body-parser";

export const KEYCAP_TEXTURES = [
  {
    id: "goodwell",
    name: "Goodwell",
    path: "/goodwell_uv.png",
    knobColor: "#E44E21",
  },
  {
    id: "dreamboard",
    name: "Dreamboard",
    path: "/dreamboard_uv.png",
    knobColor: "#E9759F",
  },
  {
    id: "cherrynavy",
    name: "Cherry Navy",
    path: "/cherrynavy_uv.png",
    knobColor: "#F06B7E",
  },
  {
    id: "kick",
    name: "Kick",
    path: "/kick_uv.png",
    knobColor: "#FD0A0A"
  },
  {
    id: "oldschool",
    name: "Old School",
    path: "/oldschool_uv.png",
    knobColor: "#B89D82",
  },
  {
    id: "candykeys",
    name: "Candy Keys",
    path: "/candykeys_uv.png",
    knobColor: "#F38785",
  },
];

/**
 * Props for `ColorChanger`.
 */
export type ColorChangerProps = SliceComponentProps<Content.ColorChangerSlice>;

/**
 * Component for "ColorChanger" Slices.
 */
const ColorChanger: FC<ColorChangerProps> = ({ slice }) => {

  const [selectedTextureId, setSelectedTextureId] = useState(KEYCAP_TEXTURES[0].id);
  const [ backgroundTexture, setBackgroundTexture ] = useState(KEYCAP_TEXTURES[0].name);
  const [ isAnimating, setIsAnimating ] = useState(false);


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex h-[90vh] min-h-250 flex-col overflow-hidden bg-linear-to-br from-[#0f172a] to-[#062f4a] text-white"
    >
      <Bounded className="relative shrink-0 " innerClassName="gap-6 lg:gap-8 flex flex-col lg:flex-row"> 
        <div className="max-w-md shrik-0">
          <div className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg-text-6xl">
              <PrismicRichText field={slice.primary.heanding} />
          </div>
          <div className="text-pretty lg:text-xl">
            <PrismicRichText field={slice.primary.description} />
          </div>
          
        </div>

        <ul className="grid max-w-3xl grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-black shadow-lg sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
          {KEYCAP_TEXTURES.map((texture) => (
            <li key={texture.id}>
              <button className={clsx("flex aspect-square flex-col justify-center rounded-lg border-2 p-4 hover:scale-105 motion-safe:transition-transform-all motion-safe:duration-300",)}>
                <div className="mb-3 overflow-hidden rounded border-2 border-black bg-gray-100">
                  <Image src={texture.path} alt={texture.name} width={300} height={200} className="h-full w-full object-cover" />
                </div>
                <span className="text-center text-sm font-semibold">{texture.name}</span>
              </button>
            </li>
          ))}
        </ul>

      </Bounded>
    </section>
  );
};

export default ColorChanger;
