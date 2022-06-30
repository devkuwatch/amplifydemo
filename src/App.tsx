import "./App.css";
import { Suspense, } from "react";
import { Canvas, } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

function Sphere() {
  return (
    <mesh visible position={[-2, 0.5, 0]} rotation={[0, 0, 0]} scale={[0.25, 0.25, 0.25]} castShadow>
      <sphereGeometry attach="geometry" args={[2, 32, 32]}/>
      <meshPhysicalMaterial   attach="material"  color="white"  metalness={0.98}  roughness={0.0}
      /> </mesh>  
   );
}

function Model({modelPath = 'https://car-configurator.s3.ap-northeast-1.amazonaws.com/demo/Supra.glb'}) {
  const gltf = useGLTF(modelPath) as unknown as GLTF;
  return (
    <>
      {
        gltf &&
        <primitive object={gltf.scene} />
      }
    </>
    )
}

function App({ env = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/quattro_canti_1k.hdr' }) {
  return (
   <div className="App">
      <Canvas  dpr={Math.max(window.devicePixelRatio, 2)} >
        <OrbitControls />
        <color attach="background" args={[0x333353]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Environment background={true} files={env} scene={undefined}  />
          <Model />
          <Sphere/>
          <mesh scale={10}>   <sphereGeometry args={[1, 64, 64]} />   </mesh>
        </Suspense>
      </Canvas>
    </div>  );
}
export default App;