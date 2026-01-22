"use client";

import { Keyboard } from "@/components/Keyboard";
import { Keycap } from "@/components/Keycap";
import { Environment, PerspectiveCamera, ContactShadows, BakeShadows } from "@react-three/drei";
import { useControls } from "leva";

export function Scene() {

  const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ, shadowMapSize, shadowBias, shadowNormalBias } = useControls({ positionX: 0, positionY: -0.5, positionZ: 3, rotationX: Math.PI / 2, rotationY: 0, rotationZ: 0, shadowMapSize: 10000000, shadowBias: -0.0002, shadowNormalBias: 0.02 });

  // gestisco le dimensioni su scermo mobile
  const scalingFactor = window.innerWidth < 500 ? 0.5 : 1;

  return (
    <group>

      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />

      <group scale={scalingFactor}>
        <Keyboard scale={9} position={[0.2, -0.5, 1.9]} rotation={[1.6, 0.4, 0]} />
        {/* <ambientLight intensity={0.2} /> */}
        {/* <pointLight position={[0, 1, 5]} intensity={2} /> */}

        <group>
          {/* <Keycap position={[positionX, positionY, positionZ]} rotation={[rotationX, rotationY, rotationZ]} /> */}
          <Keycap position={[1.54, 0.39, 2.1]} rotation={[1.57, 0, 0]} texture={0} />
          <Keycap position={[0, -0.4, 2.6]} rotation={[0, 2, 3]} texture={1} />
          <Keycap position={[-1.4, 0, 2.3]} rotation={[3, 2, 1]} texture={3} />
          <Keycap position={[-1.8, 1, 1.5]} rotation={[0, 2, 1]} texture={2} />
          <Keycap position={[0, 1, 1]} rotation={[0, 2, 2]} texture={4} />
          <Keycap position={[0.7, 0.9, 1.4]} rotation={[3, 2, 0]} texture={5} />
        </group>
      </group>

      <Environment files={["/hdr/blue-studio.hdr"]} environmentIntensity={0.05} />

      <spotLight
        position={[-2, 1.5, 3]}
        intensity={30}
        castShadow
        shadow-mapSize={4096}
        shadow-bias={-0.0002}
        shadow-normalBias={0.002}
      />

    </group>

  );
}