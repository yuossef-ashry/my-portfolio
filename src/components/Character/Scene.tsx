import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting, { type ScreenLight } from "./utils/lighting";
import { useLoading } from "../../context/LoadingContext";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../utils/loadingProgress";
import { setCharTimeline } from "../utils/GsapScroll";

function disposeObjectResources(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();

  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    const meshMaterials = Array.isArray(object.material)
      ? object.material
      : [object.material];
    meshMaterials.forEach((material) => {
      materials.add(material);
      Object.values(material).forEach((value) => {
        if (value instanceof THREE.Texture) textures.add(value);
      });
    });
  });

  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    const canvasElement = canvasDiv.current;
    if (!canvasElement) return;

    let disposed = false;
    let animationFrame = 0;
    let touchDelay: ReturnType<typeof setTimeout> | undefined;
    let introDelay: ReturnType<typeof setTimeout> | undefined;
    let stopTouchEnd: (() => void) | undefined;
    let stopAnimations: (() => void) | undefined;
    let activeCharacter: THREE.Object3D | null = null;
    let headBone: THREE.Object3D | null = null;
    let screenLight: ScreenLight | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let stopCharacterTimeline: (() => void) | undefined;
    let stopHover: (() => void) | undefined;
    let touchTarget: HTMLElement | null = null;
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const rect = canvasElement.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);
    const scene = sceneRef.current;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasElement.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, width / height, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    const light = setLighting(scene);
    const progress = setProgress(setLoading);
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchMove = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchStart = (event: TouchEvent) => {
      stopTouchEnd?.();
      stopTouchEnd = undefined;
      touchTarget = event.target instanceof HTMLElement ? event.target : null;
      if (!touchTarget) return;
      touchDelay = setTimeout(() => {
        touchTarget?.addEventListener("touchmove", onTouchMove, {
          passive: true,
        });
      }, 200);
    };

    const onTouchEnd = () => {
      if (touchDelay) clearTimeout(touchDelay);
      touchTarget?.removeEventListener("touchmove", onTouchMove);
      touchTarget = null;
      stopTouchEnd?.();
      stopTouchEnd = handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    const landingDiv = document.getElementById("landingDiv");
    document.addEventListener("mousemove", onMouseMove);
    landingDiv?.addEventListener("touchstart", onTouchStart);
    landingDiv?.addEventListener("touchend", onTouchEnd);
    landingDiv?.addEventListener("touchcancel", onTouchEnd);

    const resizeHandler = () => handleResize(renderer, camera, canvasDiv);
    const resizeObserver = new ResizeObserver(resizeHandler);
    resizeObserver.observe(canvasElement);
    window.addEventListener("resize", resizeHandler);

    loadCharacter()
      .then((gltf) => {
        if (disposed) {
          disposeObjectResources(gltf.scene);
          return;
        }

        activeCharacter = gltf.scene;
        const animations = setAnimations(gltf);
        stopAnimations = animations.dispose;
        if (hoverDivRef.current) {
          stopHover = animations.hover(gltf, hoverDivRef.current);
        }
        mixer = animations.mixer;
        scene.add(activeCharacter);
        headBone = activeCharacter.getObjectByName("spine006") ?? null;
        const lightObject = activeCharacter.getObjectByName("screenlight");
        if (
          lightObject instanceof THREE.Mesh &&
          lightObject.material instanceof THREE.MeshStandardMaterial
        ) {
          screenLight = lightObject as ScreenLight;
        }
        stopCharacterTimeline = setCharTimeline(activeCharacter, camera);

        progress.loaded().then(() => {
          if (disposed) return;
          introDelay = setTimeout(() => {
            if (disposed) return;
            light.turnOnLights();
            animations.startIntro();
          }, 2500);
        });
      })
      .catch((error: unknown) => {
        if (!disposed) {
          console.error("Unable to load the character model:", error);
          progress.clear();
        }
      });

    const clock = new THREE.Clock();
    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
      }
      light.setPointLight(screenLight);
      mixer?.update(clock.getDelta());
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      if (touchDelay) clearTimeout(touchDelay);
      if (introDelay) clearTimeout(introDelay);
      stopTouchEnd?.();
      touchTarget?.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mousemove", onMouseMove);
      landingDiv?.removeEventListener("touchstart", onTouchStart);
      landingDiv?.removeEventListener("touchend", onTouchEnd);
      landingDiv?.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("resize", resizeHandler);
      resizeObserver.disconnect();
      stopHover?.();
      stopCharacterTimeline?.();
      stopAnimations?.();
      progress.cancel();
      light.dispose();
      disposeObjectResources(scene);
      scene.clear();
      renderer.dispose();
      if (canvasElement.contains(renderer.domElement)) {
        canvasElement.removeChild(renderer.domElement);
      }
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;

