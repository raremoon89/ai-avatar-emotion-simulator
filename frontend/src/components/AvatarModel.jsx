import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

export default function AvatarModel() {
  const group = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));
    loader.load(
      '/models/sample.vrm', // ← VRM 파일 경로!
      (gltf) => {
        const vrm = gltf.userData.vrm;
        if (vrm) {
          vrm.scene.rotation.y = Math.PI;       // 정면
          vrm.scene.rotation.x = -0.2;          // 고개 들기
          vrm.scene.position.set(0, -1, 0);     // 위치 조정

          // --- 팔 내리기 예제 ---
          const rightUpperArm = vrm.humanoid.getBoneNode('rightUpperArm');
          if (rightUpperArm) rightUpperArm.rotation.z = -Math.PI / 2.2;
          const leftUpperArm = vrm.humanoid.getBoneNode('leftUpperArm');
          if (leftUpperArm) leftUpperArm.rotation.z = +Math.PI / 2.2;

          group.current.add(vrm.scene);
        } else {
          console.error('VRM not found in gltf.userData');
        }
      },
      undefined,
      (error) => {
        console.error('VRM load error:', error);
      }
    );
    return () => {
      while (group.current && group.current.children.length) {
        group.current.remove(group.current.children[0]);
      }
    };
  }, []);

  return <group ref={group} />;
}
