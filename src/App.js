import { useRef, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';


const Cube =({position, color, size}) =>{
  const cuberef = useRef();

  useFrame((state, delta) => {
    cuberef.current.position.z =Math.sin(state.clock.elapsedTime) * 1;
    cuberef.current.rotation.y +=delta * 1.0;
    cuberef.current.rotation.x +=delta;
  })

  return(
    <mesh position={position} ref={cuberef}>
      <boxGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const Sphere =({position, color, size}) =>{
  const sphereref = useRef();
  const[hovered, setHovered] = useState(false);
  const[isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = hovered ? 2.0 : .8;
    // sphereref.current.position.z =Math.sin(state.clock.elapsedTime) * 1;
    sphereref.current.rotation.y +=delta * speed;
    sphereref.current.rotation.x +=delta;
  })

  return(
    <mesh 
      position={position} 
      ref={sphereref} 
      onPointerEnter={(event) => {
      event.stopPropagation(); 
      setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)} 
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={size}/>
      <meshStandardMaterial color={hovered? "green" : color } wireframe/>
    </mesh>
  )
}

const TorusKnot =({position, color, size}) =>{
  const cuberef = useRef();

  // useFrame((state, delta) => {
  //   cuberef.current.position.z =Math.sin(state.clock.elapsedTime) * 1;
  //   cuberef.current.rotation.y +=delta * 1.0;
  //   cuberef.current.rotation.x +=delta;
  // })

  return(
    <mesh position={position} ref={cuberef}>
      <torusKnotGeometry args={size}/>
      {/* <meshStandardMaterial color={color}/> */}
      <MeshWobbleMaterial factor={.2} speed={2}/>
    </mesh>
  )
}

const Scene = () => {
  return(
    <>
      <directionalLight position={[0, 0, 2]} />
    <ambientLight/>

    {/* <group position={[0,-1,0]}>   
     <Cube position={[1, 0, 0]} color={"blue"} size={[1, 1, 1]} />
     <Cube position={[-1, 0, 0]} color={"green"} size={[1, 1, 1]} />
     <Cube position={[-1, 2, 0]} color={"yellow"} size={[1, 1, 1]} />
     <Cube position={[1, 2, 0]} color={"orange"} size={[1, 1, 1]} />
    </group>   */}

    {/* <Sphere position={[0, 0 , 0]} size={[1, 30, 30]} color={"yellow"} /> */}

    <TorusKnot
      position={[0, 0 , 0]}
      size={[1, 0.1, 30, 30]}
      color={"pink"}
    />

    <OrbitControls enableZoom={false}/>
    </>
  )
}
 
function App() {
  return (
    <Canvas>
      <Scene/>

    </Canvas>
  );
}

export default App;
