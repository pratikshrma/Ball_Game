import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls } from '@react-three/drei'
import Interface from './Interface.jsx'
const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls
        map={[
            { name: 'forward', keys: ['ArrowUp', 'keyW'] },
            { name: 'backward', keys: ['ArrowDown', 'keyS'] },
            { name: 'leftward', keys: ['ArrowLeft', 'keyA'] },
            { name: 'rightward', keys: ['ArrowRight', 'keyD'] },
            { name: 'jump', keys: ['Space'] },
        ]}
    >

        <Canvas
            shadows
            camera={{
                fov: 55,
                near: 0.1,
                far: 200,
                position: [0, 3, -7]
            }}
        >
            <Experience />
        </Canvas>
        <Interface />
    </KeyboardControls>
)