import { useState } from 'react'
import TransistorCircuitOpenChip from '../paths/TransistorCircuitOpenChip'
import { LargeSpace, themeRed } from '../constants'

function TransistorCircuitOpenChipView() {

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
        <TransistorCircuitOpenChip height={height} width={width} color='black' run={false} showChip={true}></TransistorCircuitOpenChip>
        {isVisible && (
          <TransistorCircuitOpenChip height={height} width={width} color={themeRed} run={true} showChip={false}></TransistorCircuitOpenChip>
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
  
export default TransistorCircuitOpenChipView
  