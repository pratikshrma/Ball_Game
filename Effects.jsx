import React, { useMemo } from 'react'
import { EffectComposer, Glitch, DepthOfField } from '@react-three/postprocessing'

const Effects = () => {

    return <EffectComposer>
        <DepthOfField
            focusDistance={0.01}
            focalLength={0.2}
            bokehScale={3}
        />
    </EffectComposer>
}

export default Effects