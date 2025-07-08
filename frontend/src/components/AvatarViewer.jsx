import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AvatarModel from './AvatarModel';

export default function AvatarViewer() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{
          position: [0, 1.2, 2.2],   // 가까이! (z값이 작아질수록 줌인)
          fov: 12,                   // 시야각, 작을수록 더 크게 보임
          near: 0.1,
          far: 100,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <AvatarModel />
        <OrbitControls
          target={[0, 0.45, 0]}
          minDistance={1.4}
          maxDistance={3}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
