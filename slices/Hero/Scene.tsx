"use client";

import { Keyboard } from "@/components/Keyboard";
import { Keycap } from "@/components/Keycap";
import { useGSAP } from "@gsap/react";
import { Environment, PerspectiveCamera, ContactShadows, BakeShadows } from "@react-three/drei";
import { use, useEffect, useRef, useState } from "react";
//import { useControls } from "leva";
import * as THREE from "three";


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrame, useThree } from "@react-three/fiber";


gsap.registerPlugin(useGSAP, ScrollTrigger)

function CameraController() {
  const { camera, size } = useThree();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef(new THREE.Vector3(0,0,0)); 
  const currentPositionRef = useRef(new THREE.Vector3(0,0,4)); 

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  const baseCameraPosition = { x: 0, y: 0, z:4 };

  useFrame(() => {
    const mouse = mouseRef.current;

    if(prefersReducedMotion) {
      camera.position.set(
        baseCameraPosition.x,
        baseCameraPosition.y,
        baseCameraPosition.z
      )
      camera.lookAt(targetRef.current);
      return;
    }

    const tiltX = (mouse.y - 0.5 ) * 0.3;
    const tiltY = (mouse.x - 0.5 ) * 0.3;

    const targetPosition = new THREE.Vector3(baseCameraPosition.x + tiltY, baseCameraPosition.y - tiltX, baseCameraPosition.z);
    currentPositionRef.current.lerp(targetPosition, 0.1);

    camera.position.copy(currentPositionRef.current);
    camera.lookAt(targetRef.current);
  })

  useEffect(() => {
    if(prefersReducedMotion) return;
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX / size.width;
      mouseRef.current.y = event.clientY / size.height;
    };
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    }
  }, [size]);
  return null;
}

export function Scene() {

  //const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ, shadowMapSize, shadowBias, shadowNormalBias } = useControls({ positionX: 0, positionY: -0.5, positionZ: 3, rotationX: Math.PI / 2, rotationY: 0, rotationZ: 0, shadowMapSize: 10000000, shadowBias: -0.0002, shadowNormalBias: 0.02 });
  useGSAP(() => {

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!keyboardGroupRef.current) return;

      const keyboard = keyboardGroupRef.current;

      gsap.to(
        { lightIntensityScaler: 0 },
        {
          lightIntensityScaler: 1,
          duration: 3.5,
          delay: 0.5,
          ease: "power2.inOut",
          onUpdate: function () {
            setLightIntensityScaler(this.targets()[0].lightIntensityScaler);
          }
        },
      )

      const tl = gsap.timeline({
        ease: "power2.inOut",

      })

      tl.to(keyboard.position, {
        x: 0,
        y: -0.5,
        z: 0.5,
        duration: 2,
      })
        .to(keyboard.rotation, {
          x: 1.4,
          y: 0,
          z: 0,
          duration: 1.8,

        }, "<")
        .to(keyboard.position, {
          x: 0.2,
          y: -0.5,
          z: 1.9,
          duration: 2,
          delay: 0.5,
        })
        .to(keyboard.rotation, {
          x: 1.6,
          y: 0.4,
          z: 0,
          duration: 2,
        }, "<")

    })
  })

  const keyboardGroupRef = useRef<THREE.Group>(null);

  const [lightIntensityScaler, setLightIntensityScaler] = useState(0);

  // gestisco le dimensioni su scermo mobile
  const scalingFactor = window.innerWidth < 500 ? 0.5 : 1;



  return (
    <group>

      <CameraController />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />



      <group scale={scalingFactor}>
        <group ref={keyboardGroupRef}>
          <Keyboard scale={9} />
          {/* <ambientLight intensity={0.2} /> */}
          {/* <pointLight position={[0, 1, 5]} intensity={2} /> */}
        </group>

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

      <Environment files={["/hdr/blue-studio.hdr"]} environmentIntensity={0.2 * lightIntensityScaler} />

      <spotLight
        position={[-2, 1.5, 3]}
        intensity={30 * lightIntensityScaler}
        castShadow
        shadow-mapSize={4096}
        shadow-bias={-0.0002}
        shadow-normalBias={0.002}
      />

    </group>

  );
}