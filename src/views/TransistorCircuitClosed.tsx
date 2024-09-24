import { useRef, useState } from 'react'
import TransistorCircuitClosed from '../paths/TransistorCircuitClosed'
import { LargeSpace, themeRed } from '../constants'

function TransistorCircuitClosedView() {

  const height = 400
  const width = 1000
  const pathRef1 = useRef(null)
  const pathRef2 = useRef(null)

  const [isVisible, setIsVisible] = useState(false);

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
        <TransistorCircuitClosed ref={pathRef2} height={height} width={width} color='black' run={false}></TransistorCircuitClosed>
        {isVisible && (
          <TransistorCircuitClosed ref={pathRef1} height={height} width={width} color={themeRed} run={true}></TransistorCircuitClosed>
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
  
export default TransistorCircuitClosedView
  