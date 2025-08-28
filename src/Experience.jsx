import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Level from './Level.jsx'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import Player from './Player.jsx'
import useGame from './stores/useGame.js'
import Effects from '../Effects.jsx'
import { Suspense } from 'react'

export default function Experience() {
    const blockCount = useGame((state) => state.blockCount)
    const blockSeed = useGame((state) => state.blockSeed)

    return <>
        <color args={["#bdedfc"]} attach="background" />
        <Perf position='top-right' />
        {/* <OrbitControls makeDefault /> */}
        {/* <Effects /> */}
        <Suspense fallback={null}>
            <Physics>
                <Lights />
                <Level count={blockCount} seed={blockSeed} />
                <Player />
            </Physics>
        </Suspense>
    </>
}