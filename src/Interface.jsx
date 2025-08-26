import React, { useRef, useEffect } from 'react'
import { useKeyboardControls } from '@react-three/drei'
import { addEffect } from '@react-three/fiber'
import useGame from './stores/useGame'

const Interface = () => {
    const time = useRef()
    const controls = useKeyboardControls((state) => state)
    const forward = useKeyboardControls(state => state.forward)
    const rightward = useKeyboardControls(state => state.rightward)
    const backward = useKeyboardControls(state => state.backward)
    const leftward = useKeyboardControls(state => state.leftward)
    const jump = useKeyboardControls(state => state.jump)

    const restart = useGame(state => state.restart)
    const phase = useGame(state => state.phase)

    useEffect(() => {
        const unSubEffect = addEffect(() => {
            const state = useGame.getState()
            let elapsedTime = 0
            if (state.phase === 'playing') {
                elapsedTime = Math.max(Date.now() - state.startTime, 0.00)
            } else {
                elapsedTime = Math.max(state.endTime - state.startTime, 0.00)
            }
            elapsedTime = elapsedTime / 100
            elapsedTime = elapsedTime.toFixed(2)
            if (time.current)
                time.current.textContent = elapsedTime
        })
        return () => { unSubEffect() }
    }, [])


    return (
        <div className='interface'>
            <div className='time' ref={time}>0.000</div>

            {phase == 'ended' &&
                <div className='restart' onClick={restart}>Restart</div>
            }

            <div className="controls">
                <div className="raw">
                    <div className={`key ${forward ? 'active' : ''}`}>
                    </div>
                </div>
                <div className="raw">
                    <div className={`key ${leftward ? 'active' : ''}`}></div>
                    <div className={`key ${backward ? 'active' : ''}`}></div>
                    <div className={`key ${rightward ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key large ${jump ? 'active' : ''}`}>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Interface