import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Lights() {
    const lightRef = useRef()
    useFrame((state, delta) => {
        lightRef.current.position.z = state.camera.position.z + 4
        lightRef.current.target.position.z = state.camera.position.z + 4
        lightRef.current.target.updateMatrixWorld()
    })


    return <>
        <directionalLight
            ref={lightRef}
            castShadow
            position={[4, 4, 1]}
            intensity={3.5}
            shadow-mapSize={[3024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={100}
            shadow-camera-top={10}
            shadow-camera-right={10}
            shadow-camera-bottom={- 10}
            shadow-camera-left={- 100}
        />
        <ambientLight intensity={0.5} />
    </>
}