"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const ACCENT = "#FF7A45";
const RIM = "#3E8FB0";

function usePointerTarget() {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);
  return target;
}

function getSpherePoints(
  count: number,
  radius: number,
): [number, number, number][] {
  const points: [number, number, number][] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    points.push([
      Math.cos(phi) * r * radius,
      y * radius,
      Math.sin(phi) * r * radius,
    ]);
  }
  return points;
}

function useRadialGlowTexture(color: string) {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, `${color}55`);
    gradient.addColorStop(0.5, `${color}1a`);
    gradient.addColorStop(1, `${color}00`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, [color]);
}

function GlowBackdrop() {
  const texture = useRadialGlowTexture(ACCENT);
  return (
    <mesh position={[0, 0, -1.4]} scale={2.6}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Outer structure only — no solid core, so the text has clear space
// to sit inside the form rather than in front of a filled shape.
function Shell() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta * 0.035;
    ref.current.rotation.y -= delta * 0.05;
  });
  return (
    <mesh ref={ref} scale={1.3}>
      {" "}
      {/* bigger now there's no core filling the middle */}
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.4} />
    </mesh>
  );
}

// A second, slower inner wireframe — replaces the solid core with a
// faint nested layer instead of leaving pure empty space in the middle.
function InnerShell() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.05;
    ref.current.rotation.y += delta * 0.07;
  });
  return (
    <mesh ref={ref} scale={0.75}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={RIM} wireframe transparent opacity={0.25} />
    </mesh>
  );
}

function Nodes() {
  const points = useMemo(() => getSpherePoints(6, 1.32), []);
  return (
    <>
      {points.map((p, i) => (
        <group key={i}>
          <mesh position={p}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={1.6}
              toneMapped={false}
            />
          </mesh>
          <Line
            points={[[0, 0, 0], p]}
            color={ACCENT}
            transparent
            opacity={0.28}
            lineWidth={1}
          />
        </group>
      ))}
    </>
  );
}

function Scene() {
  const pointer = usePointerTarget();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.02;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      groupRef.current.rotation.y + pointer.current.x * 0.15,
      0.04,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.current.y * 0.12,
      0.04,
    );
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[-3, -1.5, -2]} intensity={0.8} color={RIM} />
      <pointLight position={[1.5, 1, 1.5]} intensity={0.6} color={ACCENT} />

      <GlowBackdrop />
      <group ref={groupRef} position={[0.1, 0, 0]}>
        <Shell />
        <InnerShell />
        <Nodes />
      </group>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.4], fov: 31 }}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: "none", background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            intensity={0.65}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
