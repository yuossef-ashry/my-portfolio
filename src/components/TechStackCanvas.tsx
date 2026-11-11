import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { technologies } from "./techStackData";
import "./styles/TechStack.css";

const textureLoader = new THREE.TextureLoader();
const textures = technologies.map((technology) =>
  textureLoader.load(technology.icon)
);

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = Array.from({ length: 30 }, (_, index) => ({
  index,
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  index: number;
  scale: number;
  material: THREE.MeshStandardMaterial;
};

function SphereGeo({ index, scale, material }: SphereProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const basePosition = useMemo(() => {
    const row = Math.floor(index / 6);
    const column = index % 6;
    return new THREE.Vector3(
      (column - 2.5) * 3.35 + (row % 2) * 0.7,
      (2 - row) * 2.15,
      ((column + row) % 3 - 1) * 1.8
    );
  }, [index]);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock, pointer, viewport }, frameDelta) => {
    if (!mesh.current) return;
    const delta = Math.min(frameDelta, 0.1);
    const time = clock.elapsedTime;
    const pointerX = (pointer.x * viewport.width) / 2;
    const pointerY = (pointer.y * viewport.height) / 2;
    const awayX = basePosition.x - pointerX;
    const awayY = basePosition.y - pointerY;
    const distance = Math.max(Math.hypot(awayX, awayY), 0.001);
    const influence = Math.max(0, 1 - distance / 4.5);

    targetPosition.set(
      basePosition.x +
        Math.sin(time * 0.5 + index) * 0.48 +
        (awayX / distance) * influence * 1.6,
      basePosition.y +
        Math.cos(time * 0.45 + index * 1.7) * 0.4 +
        (awayY / distance) * influence * 1.3,
      basePosition.z + Math.sin(time * 0.36 + index) * 0.35
    );

    mesh.current.position.lerp(targetPosition, Math.min(1, delta * 4));
    mesh.current.rotation.x += delta * (0.12 + (index % 3) * 0.035);
    mesh.current.rotation.y += delta * (0.15 + (index % 4) * 0.025);
  });

  return (
    <mesh
      ref={mesh}
      position={basePosition}
      scale={scale}
      geometry={sphereGeometry}
      material={material}
      rotation={[0.3, 1, 1]}
    />
  );
}

const TechStackCanvas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleScroll = () => {
      const top = sectionRef.current?.getBoundingClientRect().top ?? Infinity;
      setIsActive(
        !reducedMotion.matches &&
          top < window.innerHeight * 0.75 &&
          top > -window.innerHeight
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    reducedMotion.addEventListener("change", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      reducedMotion.removeEventListener("change", handleScroll);
    };
  }, []);

  const materials = useMemo(
    () =>
      textures.map(
        (texture) =>
          new THREE.MeshStandardMaterial({
            map: texture,
            emissive: "#ffffff",
            emissiveMap: texture,
            emissiveIntensity: 0.3,
            metalness: 0.25,
            roughness: 0.75,
          })
      ),
    []
  );

  return (
    <div className="tech-canvas-wrap" aria-hidden="true" ref={sectionRef}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={isActive ? "always" : "never"}
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        {spheres.map((props) => (
          <SphereGeo
            key={props.index}
            {...props}
            material={materials[props.index % materials.length]}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default TechStackCanvas;

