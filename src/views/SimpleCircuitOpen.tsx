import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import SimpleCircuitOpen from '../paths/SimpleCircuitOpen'
import { LargeSpace, themeRed } from '../constants'

function SimpleCircuitOpenView() {

  const height = 400
  const width = 1000
  const pathRef1 = useRef(null)
  const pathRef2 = useRef(null)

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() =>  {
    if (isVisible) {
      anime({
        targets: pathRef1.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        delay: 500,
      })
    }
  }, [isVisible])

  const handleRun = () => {
    setIsVisible(false)
    setIsVisible(true)
  }

  const handleReset = () => {
    setIsVisible(false)
  }

  return (
    <div>
      <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" overflow={'visible'}>
        <SimpleCircuitOpen ref={pathRef2} height={height} width={width} color='black'></SimpleCircuitOpen>
        {isVisible && (
          <SimpleCircuitOpen ref={pathRef1} height={height} width={width} color={themeRed}></SimpleCircuitOpen>
        )}
      </svg>
      <LargeSpace></LargeSpace>
      <div onClick={() => handleRun()}>
        Run
      </div>
      <div onClick={() => handleReset()}>
        Reset
      </div>
    </div>
  )
}
  
export default SimpleCircuitOpenView
  