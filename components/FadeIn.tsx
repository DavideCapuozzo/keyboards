"use client";

import { useRef } from "react";
import { clsx } from "clsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FadeInProps = {
    children: React.ReactNode;
    vars?: gsap.TweenVars;
    start?: string,
    className?: string;
    targetChildren?: boolean;
};

export function FadeIn({ children, vars = {}, start = "top 50%", className, targetChildren = false }: FadeInProps) {

    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const target = targetChildren ? containerRef.current?.children : containerRef.current;
        if (!target) return;

        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {


            gsap.set(target, { opacity: 0, y: 60 });

            gsap.to(target, {
                duration: 0.8,
                opacity: 1,
                y: 0,
                ease: "power3.out",
                stagger: 0.2,
                ...vars,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start
                },
            });
        })
    })


    return (
        <div ref={containerRef} className={clsx(className)}>
            {children}
        </div>
    );
}