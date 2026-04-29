"use client";

import React, { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Text, 
  ContactShadows
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LampModel, { LampHandle } from "./LampModel";

gsap.registerPlugin(ScrollTrigger);

const AnimationController = ({ 
  lampRef, 
  letterRefs, 
  sectionRef, 
  containerRef 
}: any) => {
  const [init, setInit] = useState(false);

  useFrame(() => {
    if (!init && lampRef.current?.group && letterRefs.current[5]) {
      setInit(true);
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    if (!init) return;

    const ctx = gsap.context(() => {
      const allLetters = letterRefs.current.filter(Boolean);
      const gLetter = letterRefs.current[2]; // G is 3rd letter (index 2)
      
      // 1. ENSURE ALL LETTERS START VISIBLE
      gsap.set(allLetters, { fillOpacity: 1, y: 0.8, x: (i: number) => -6.25 + i * 2.5 });
      gsap.set(lampRef.current.group.position, { x: -20, y: 0, z: 0 });
      gsap.set(lampRef.current.head.rotation, { z: -Math.PI / 2 });

      // 2. Entrance Animation
      gsap.from(allLetters, {
        fillOpacity: 0,
        y: 5,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out"
      });

      // 3. Scroll Sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Lamp Jump Path (to land on G at -1.25)
      const jumpPositions = [-14, -9, -1.25];
      jumpPositions.forEach((targetX, i) => {
        scrollTl.to(lampRef.current.group.position, { x: targetX, duration: 1, ease: "none" });
        scrollTl.to(lampRef.current.group.position, { 
          y: i === 2 ? 4 : 2, 
          duration: 0.5, 
          ease: "power1.out" 
        }, "<");
        scrollTl.to(lampRef.current.group.position, { 
          y: 0, 
          duration: 0.5, 
          ease: "power1.in" 
        }, ">");

        scrollTl.to(lampRef.current.base.scale, { y: 0.5, x: 1.5, duration: 0.2 }, "<0.4");
        scrollTl.to(lampRef.current.base.scale, { y: 1, x: 1, duration: 0.3 }, ">");
      });
      
      // THE IMPACT ON G
      // Wait for lamp to land on G at exactly -1.25
      if (gLetter) {
        // G falls as lamp lands
        scrollTl.to(gLetter.rotation, { x: -Math.PI / 2.2, duration: 0.6, ease: "bounce.out" }, "<");
        scrollTl.to(gLetter.position, { y: 0.1, z: 1, duration: 0.6 }, "<");
        
        // THEN G disappears
        scrollTl.to(gLetter, { fillOpacity: 0, duration: 0.5, ease: "power2.in" }, ">");
      }
      
      scrollTl.to(lampRef.current.head.rotation, { z: 0, duration: 1 });
      scrollTl.to(lampRef.current.light, { intensity: 50, duration: 0.5 });
      scrollTl.to(containerRef.current, { opacity: 0, duration: 1 });
    }, sectionRef);

    return () => ctx.revert();
  }, [init, lampRef, letterRefs, sectionRef, containerRef]);

  return null;
};

const ThreeScene = () => {
  const lampRef = useRef<LampHandle>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const sectionRef = useRef<HTMLDivElement>(null!);
  const letterRefs = useRef<any[]>([]);

  const name = "YOGESH";
  const spacing = 2.5;
  const startX = -((name.length - 1) * spacing) / 2;

  const positions = useMemo(() => 
    name.split("").map((_, i) => [startX + i * spacing, 0.8, 0] as [number, number, number]),
    [startX, spacing]
  );

  return (
    <div ref={sectionRef} className="h-screen w-full bg-[#030303] overflow-hidden">
      <div ref={containerRef} className="h-full w-full relative z-50">
        <Canvas shadows gl={{ antialias: true }} camera={{ position: [0, 2, 12], fov: 35 }}>
          <Suspense fallback={null}>
            <color attach="background" args={["#030303"]} />
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} intensity={3} color="#d4af37" />
            <pointLight position={[-10, 10, 5]} intensity={2} />

            <group position={[0, -1.5, 0]}>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#050505" />
              </mesh>
              <ContactShadows opacity={0.4} scale={20} blur={2.4} far={4.5} />

              {name.split("").map((letter, i) => (
                <Text
                  key={`${letter}-${i}`}
                  ref={(el) => (letterRefs.current[i] = el)}
                  position={positions[i]}
                  fontSize={2.5}
                  color="#d4af37"
                  anchorX="center"
                  anchorY="middle"
                  castShadow
                >
                  {letter}
                </Text>
              ))}

              <LampModel ref={lampRef} />
            </group>

            <AnimationController 
              lampRef={lampRef}
              letterRefs={letterRefs}
              sectionRef={sectionRef}
              containerRef={containerRef}
            />
          </Suspense>
        </Canvas>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white">Scroll to Discover</p>
          <div className="w-px h-12 bg-accent animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default ThreeScene;
