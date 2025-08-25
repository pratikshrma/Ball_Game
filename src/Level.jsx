import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useState, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'


THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: "limeGreen" })
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenYellow" })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" })
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" })

const BlockStart = ({ position = [0, 0, 0] }) => {
    return (
        <>
            <group position={position}>
                <mesh geometry={boxGeometry} material={floor1Material} receiveShadow scale={[4, 0.2, 4]} position-y={-0.2}>
                    {/* <boxGeometry args={[4, 0.2, 4]} /> */}
                    {/*Why not this because this will create a box geo everytime we call this instead we just made it once  */}
                    {/* <meshStandardMaterial color="limegreen" /> */}
                </mesh>
            </group>
        </>
    )
}
const BlockEnd = ({ position = [0, 0, 0] }) => {
    const model = useGLTF('./hamburger.glb')

    model.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    return (
        <>
            <group position={position}>
                <mesh geometry={boxGeometry} material={floor1Material} receiveShadow scale={[4, 0.2, 4]} position-y={-0.2}>
                    {/* <boxGeometry args={[4, 0.2, 4]} /> */}
                    {/*Why not this because this will create a box geo everytime we call this instead we just made it once  */}
                    {/* <meshStandardMaterial color="limegreen" /> */}
                </mesh>
                <RigidBody type='fixed' colliders="trimesh" position-y={0.15} restitution={0.2} friction={0}>
                    <primitive object={model.scene} scale={0.15} />
                </RigidBody>
            </group>
        </>
    )
}
export const BlockSpinner = ({ position = [0, 0, 0] }) => {

    const spinnerRef = useRef(null)
    const [speed] = useState(() => (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1))

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime
        const eularRotation = new THREE.Euler(0, time * speed, 0)
        const quaternion = new THREE.Quaternion()
        quaternion.setFromEuler(eularRotation)
        spinnerRef.current.setNextKinematicRotation(quaternion)
    })

    return (
        <>
            <group position={position}>
                <RigidBody type='fixed'>
                    <mesh geometry={boxGeometry} material={floor2Material} scale={[4, 0.2, 4]} position-y={-0.2} receiveShadow />
                </RigidBody>
                <RigidBody ref={spinnerRef} type='kinematicPosition' restitution={0.2} friction={0}>
                    <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow receiveShadow />
                </RigidBody>

            </group>
        </>
    )
}
export const BlockLimbo = ({ position = [0, 0, 0] }) => {

    const obstacle = useRef(null)
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime
        const y = (Math.sin(time + timeOffset) + 1.1)
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: y, z: position[2] })
    })

    return (
        <>
            <group position={position}>
                <RigidBody type='fixed'>
                    <mesh geometry={boxGeometry} material={floor2Material} scale={[4, 0.2, 4]} position-y={-0.2} receiveShadow />
                </RigidBody>
                <RigidBody ref={obstacle} type='kinematicPosition' restitution={0.2} friction={0}>
                    <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow receiveShadow />
                </RigidBody>

            </group>
        </>
    )
}
export const BlockBlade = ({ position = [0, 0, 0] }) => {

    const obstacle = useRef(null)
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state, delta) => {
        if (!obstacle.current) return
        const time = state.clock.elapsedTime
        const rotationQuaternion = new THREE.Quaternion()
        rotationQuaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.sin(time + timeOffset))
        //I don't understand the above funciton what the hell 
        rotationQuaternion.normalize()
        obstacle.current.setNextKinematicRotation(rotationQuaternion)
    })

    return (
        <>
            <group position={position}>
                <RigidBody type='fixed'>
                    <mesh geometry={boxGeometry} material={floor2Material} scale={[4, 0.2, 4]} position-y={-0.2} receiveShadow />
                </RigidBody>
                <RigidBody type='kinematicPosition' ref={obstacle} position-y={1.4}>
                    <group>
                        <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[0.3, 1.5, 0.1]} position-y={-0.5} castShadow receiveShadow />
                        <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[1.2, 0.5, 0.1]} position-y={-1} />
                    </group>
                </RigidBody>

            </group>
        </>
    )
}
export const BlockLameAxe = ({ position = [0, 0, 0] }) => {

    const obstacle = useRef(null)
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime
        const x = (Math.sin(time + timeOffset) * 1.1)
        obstacle.current.setNextKinematicTranslation({ x: x, y: position[1], z: position[2] })
    })

    return (
        <>
            <group position={position}>
                <RigidBody type='fixed'>
                    <mesh geometry={boxGeometry} material={floor2Material} scale={[4, 0.2, 4]} position-y={-0.2} receiveShadow />
                </RigidBody>
                <RigidBody ref={obstacle} type='kinematicPosition' restitution={0.2} friction={0}>
                    <mesh geometry={boxGeometry} material={obstacleMaterial} position-y={0.5} scale={[1.5, 1.3, 0.3]} castShadow receiveShadow />
                </RigidBody>

            </group>
        </>
    )
}

export const Bounds = ({ length = 1 }) => {
    console.log(length)
    return <>
        <RigidBody type='fixed' restitution={0.2} friction={0}>
            <mesh
                position={[2.10, 0.70, (length * 2) + 2]}
                geometry={boxGeometry}
                material={wallMaterial}
                scale={[0.3, 1.5, ((length + 2) * 4)]}
                castShadow
            />
            <mesh
                position={[-2.10, 0.70, (length * 2) + 2]}
                geometry={boxGeometry}
                material={wallMaterial}
                scale={[0.3, 1.5, ((length + 2) * 4)]}
                receiveShadow
                castShadow
            />
            <mesh
                position={[0, 0.7, (length + 1) * 4 + 2]}
                geometry={boxGeometry}
                material={wallMaterial}
                scale={[4, 1.5, 0.3]}
                receiveShadow
            />

            <CuboidCollider
                args={[2, 0.1, 2 * length + 4]}
                position={[0, -0.2, (length * 2) + 2]}
                restitution={0.2}
                friction={1}
            />

        </RigidBody>
    </>
}
export default function Level({ count = 5, types = [BlockSpinner, BlockLimbo, BlockBlade, BlockLameAxe] }) {

    const blocks = useMemo(() => {
        const blocks = []

        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }

        return blocks
    }, [count, types])

    return (
        <>
            <BlockStart position={[0, 0, 0]} />
            {blocks.map((Block, index) => <Block key={index} position={[0, 0, (index + 1) * 4]} />)}
            <BlockEnd position={[0, 0, (blocks.length + 1) * 4]} />
            <Bounds length={blocks.length}></Bounds>
        </>
    )
}
