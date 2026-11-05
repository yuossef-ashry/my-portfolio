import * as THREE from "three";
import gsap from "gsap";
import type { ScreenLight } from "../Character/utils/lighting";

function getSingleMaterial(
  object: THREE.Object3D
): THREE.Material | null {
  if (!(object instanceof THREE.Mesh) || Array.isArray(object.material)) {
    return null;
  }
  return object.material;
}

function isEmissiveMaterial(
  material: THREE.Material | null
): material is THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial {
  return (
    material instanceof THREE.MeshStandardMaterial ||
    material instanceof THREE.MeshPhysicalMaterial
  );
}

export function setCharTimeline(
  character: THREE.Object3D | null,
  camera: THREE.PerspectiveCamera
): () => void {
  if (!character) return () => undefined;

  const modelParts: {
    monitor?: THREE.Mesh;
    monitorMaterial?: THREE.Material;
    screenLight?: ScreenLight;
  } = {};

  character.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;

    const material = getSingleMaterial(object);
    if (object.name === "screenlight" && isEmissiveMaterial(material)) {
      material.transparent = true;
      material.opacity = 0;
      material.emissive.set("#ffc46b");
      modelParts.screenLight = object as ScreenLight;
    }

  });

  const monitorGroup = character.getObjectByName("Plane004");
  monitorGroup?.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];
    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0;
      if (material.name === "Material.027") {
        modelParts.monitor = object;
        modelParts.monitorMaterial = material;
        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshPhysicalMaterial
        ) {
          material.color.set("#ffffff");
        }
      }
    });
  });

  if (window.innerWidth <= 1279) return () => undefined;

  const triggerIds = ["character-landing", "character-about", "character-services"];
  const landingTimeline = gsap.timeline({
    scrollTrigger: {
      id: triggerIds[0],
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      id: triggerIds[1],
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const servicesTimeline = gsap.timeline({
    scrollTrigger: {
      id: triggerIds[2],
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const screenLight = modelParts.screenLight;
  const monitor = modelParts.monitor;
  const monitorMaterial = modelParts.monitorMaterial;
  const flickerMaterial = screenLight?.material ?? null;
  const flickerTimeline = isEmissiveMaterial(flickerMaterial)
    ? gsap
        .timeline({ repeat: -1, repeatRefresh: true })
        .to(flickerMaterial, {
          emissiveIntensity: () => gsap.utils.random(0.2, 8),
          duration: () => gsap.utils.random(0.2, 0.6),
          delay: () => gsap.utils.random(0, 0.1),
        })
    : null;

  const neckBone = character.getObjectByName("spine005");
  landingTimeline
    .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
    .to(camera.position, { z: 22 }, 0)
    .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
    .to(".landing-container", { y: "40%", duration: 0.8 }, 0);

  aboutTimeline
    .to(
      camera.position,
      { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
      0
    )
    .fromTo(
      ".character-model",
      { pointerEvents: "inherit" },
      { pointerEvents: "none", delay: 2, duration: 5 },
      0
    )
    .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0);

  if (neckBone) {
    aboutTimeline.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
  }
  if (monitor && monitorMaterial) {
    aboutTimeline
      .to(monitorMaterial, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
      .fromTo(
        monitor.position,
        { y: -10, z: 2 },
        { y: 0, z: 0, delay: 1.5, duration: 3 },
        0
      );
  }
  if (screenLight) {
    aboutTimeline.to(screenLight.material, {
      opacity: 1,
      duration: 0.8,
      delay: 4.5,
    }, 0);
  }
  aboutTimeline.fromTo(
    ".character-rim",
    { opacity: 1, scaleX: 1.4 },
    { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
    0.3
  );

  servicesTimeline
    .fromTo(
      ".character-model",
      { y: "0%" },
      { y: "-100%", duration: 4, ease: "none", delay: 1 },
      0
    )
    .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);

  const cleanup = () => {
    landingTimeline.scrollTrigger?.kill();
    aboutTimeline.scrollTrigger?.kill();
    servicesTimeline.scrollTrigger?.kill();
    landingTimeline.kill();
    aboutTimeline.kill();
    servicesTimeline.kill();
    flickerTimeline?.kill();
  };

  return cleanup;
}

