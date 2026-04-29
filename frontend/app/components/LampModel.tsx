"use client";

import React, { useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export interface LampHandle {
  group: THREE.Group;
  head: THREE.Group;
  midJoint: THREE.Group;
  base: THREE.Group;
  light: THREE.SpotLight;
}

const LampModel = forwardRef<LampHandle, {}>((props, ref) => {
  const groupRef = useRef<THREE.Group>(null!);
  const baseRef = useRef<THREE.Group>(null!);
  const midJointRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Group>(null!);
  const lightRef = useRef<THREE.SpotLight>(null!);

  useImperativeHandle(ref, () => ({
    group: groupRef.current,
    base: baseRef.current,
    midJoint: midJointRef.current,
    head: headRef.current,
    light: lightRef.current,
  }));

  return (
    <group ref={groupRef} dispose={null}>
      {/* Base */}
      <group ref={baseRef}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.6, 0.1, 32]} />
          <meshStandardMaterial color="#333" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Lower Arm */}
        <group position={[0, 0.05, 0]}>
          <mesh castShadow position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
            <meshStandardMaterial color="#444" />
          </mesh>

          {/* Middle Joint */}
          <group ref={midJointRef} position={[0, 0.8, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#222" />
            </mesh>

            {/* Upper Arm */}
            <group rotation={[0, 0, Math.PI / 4]}>
              <mesh castShadow position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
                <meshStandardMaterial color="#444" />
              </mesh>

              {/* Head Joint / Lamp Head */}
              <group ref={headRef} position={[0, 0.8, 0]}>
                <mesh castShadow rotation={[0, 0, -Math.PI / 2]}>
                  <coneGeometry args={[0.3, 0.5, 32]} />
                  <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
                </mesh>
                
                {/* Bulb / Lens */}
                <mesh position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                  <circleGeometry args={[0.2, 32]} />
                  <meshBasicMaterial color="#fff" transparent opacity={0.5} />
                </mesh>

                {/* The Actual Spotlight */}
                <spotLight
                  ref={lightRef}
                  name="lampLight"
                  position={[0.3, 0, 0]}
                  angle={0.4}
                  penumbra={0.5}
                  intensity={0}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
});

LampModel.displayName = "LampModel";

export default LampModel;
