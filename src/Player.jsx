import { useFrame } from '@react-three/fiber'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'

const Player = () => {
    const [subscribeKeys, getKeys] = useKeyboardControls()

    const body = useRef()
    const { rapier, world } = useRapier()

    // Now what i am doing is lurping
    const [smoothedCameraPostion] = useState(() => new THREE.Vector3(10, 10, 10))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())


    const jump = () => {
        if (!body.current || !rapier || !world) return

        const radius = 0.3
        const EPS = 0.02
        const c = body.current.translation()

        const origin = { x: c.x, y: c.y - (radius - EPS), z: c.z }
        const dir = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, dir)

        const hit = world.castRay(ray)

        if (hit && hit.timeOfImpact < 0.12) {
            body.current.applyImpulse({ x: 0, y: 0.3, z: 0 }, true) // wake up
        }
    }

    useEffect(() => {
        const unsubJump = subscribeKeys((state) => {
            return state.jump
        }, (value) => { jump() })
        return () => unsubJump
    }, [])

    useFrame((state, delta) => {
        const { leftward, rightward, backward, forward } = getKeys()
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        if (forward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        if (rightward) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }
        if (backward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
        if (leftward) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)


        // Camera

        const bodyPosition = body.current.translation()
        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z -= 2.25
        cameraPosition.y += 0.65

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y -= 0.25

        console.log(smoothedCameraPostion)
        smoothedCameraPostion.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)
        // smoothedCameraPostion.lerp(cameraPosition, 0.1)
        // smoothedCameraTarget.lert(cameraTarget, 0.1)

        state.camera.position.copy(smoothedCameraPostion)
        state.camera.lookAt(smoothedCameraTarget)

    })



    return (
        <RigidBody
            ref={body}
            type='dynamic'
            colliders="ball"
            restitution={0.5}
            friction={1}
            position={[0, 1, 0]}
            angularDamping={0.5}
            linearDamping={0.5}
        >
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial flatShading color="mediumPurple" />
            </mesh>
        </RigidBody>
    )
}

export default Player