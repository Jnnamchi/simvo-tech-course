import { useRef, useState } from 'react'
import TransistorCircuitClosedChip from '../paths/TransistorCircuitClosedChip'
import { LargeSpace, themeRed } from '../constants'

function TransistorCircuitClosedChipView() {

  const height = 400
  const width = 1000

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
        <TransistorCircuitClosedChip height={height} width={width} color='black' run={false} showChip={true}></TransistorCircuitClosedChip>
        {isVisible && (
          <TransistorCircuitClosedChip height={height} width={width} color={themeRed} run={true} showChip={false}></TransistorCircuitClosedChip>
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
  
export default TransistorCircuitClosedChipView
  