import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Object3D, Object3DEventMap } from 'three';
import { LoadStep } from './StepLoader';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      primitive: {
        object: Object3D<Object3DEventMap>;
      };
    }
  }
}

function StepModel({ url, ...props }: { url: string; scale: number[] }) {
  const [obj, setObj] = useState<Object3D<Object3DEventMap> | null>(null);
  useEffect(() => {
    async function load() {
      const mainObject = await LoadStep(url);
      setObj(mainObject);
    }
    load();
  }, []);
  if (!obj) {
    return null;
  }
  return (
    <group {...props}>
      <primitive object={obj} />
    </group>
  );
}

export default function Model3D({ url }: { url: string }) {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
      <StepModel scale={[0.1, 0.1, 0.1]} url={url} />
    </Canvas>
  );
}
