import * as THREE from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { decryptFile } from "./decrypt";
import { publicAsset } from "../../../utils/publicAsset";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(publicAsset("draco/"));
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF> => {
    const encryptedBlob = await decryptFile(
      publicAsset("models/character.enc"),
      "Character3D#@"
    );
    const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

    try {
      const gltf = await new Promise<GLTF>((resolve, reject) => {
        loader.load(blobUrl, resolve, undefined, reject);
      });

      await renderer.compileAsync(gltf.scene, camera, scene);
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.frustumCulled = true;
        }
      });

      for (const footName of ["footR", "footL"]) {
        const foot = gltf.scene.getObjectByName(footName);
        if (foot) foot.position.y = 3.36;
      }

      return gltf;
    } finally {
      URL.revokeObjectURL(blobUrl);
      dracoLoader.dispose();
    }
  };

  return { loadCharacter };
};

export default setCharacter;
