import { useEffect, useState } from 'react'
import { LargeSpace } from '../constants'
import { OutputWire, InputWireSwitch, SwitchInputProps } from '../items/SwitchInput'
import Chip from '../items/Chip'
import MemoryBitBox from '../items/MemoryBitBox'

const MemoryBit: React.FC = () => {

  const height = 400
  const width = 1000

  const [inputSwitchOn, setInputSwitchOn] = useState(false)
  const [setSwitchOn, setSetSwitchOn] = useState(false)
  const [outputWireOn, setOutputWireOn] = useState(false)

  const inputWireSettings: SwitchInputProps = {
    containerHeight: height,
    containerWidth: width,
    xPos: 1,
    yPos: 4,
    resolution: 10,
    xScale: 1,
    yScale: 1
  }

  const setWireSettings: SwitchInputProps = {
    containerHeight: height,
    containerWidth: width,
    xPos: 1,
    yPos: 7,
    resolution: 10,
    xScale: 1,
    yScale: 1
  }
  
  const outputWireSettings: SwitchInputProps = {
    containerHeight: height,
    containerWidth: width,
    xPos: 7,
    yPos: 4.5,
    resolution: 10,
    xScale: 0.7,
    yScale: 1
  }

  const handleReset = async () => {
    setSetSwitchOn(false)
    setInputSwitchOn(false)
    setOutputWireOn(false)
  }

  useEffect(() =>  {
    // Set off, Input on, turn set on:
    async function setWire () {
      if (setSwitchOn) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOutputWireOn(inputSwitchOn)
      }
    }
    setWire()
  }, [setSwitchOn, inputSwitchOn])

  return (
    <>
      <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" overflow={'visible'}>
        {/* Computer Chip */}
        <Chip width={width} height={height} />

        {/* InputSwitch */}
        <InputWireSwitch settings={inputWireSettings} wireOn={inputSwitchOn} onClickFn={() => setInputSwitchOn(!inputSwitchOn)}></InputWireSwitch>

        {/* SetSwitch */}
        <InputWireSwitch settings={setWireSettings} wireOn={setSwitchOn} onClickFn={() => setSetSwitchOn(!setSwitchOn)}></InputWireSwitch>

        {/* Output */}
        <OutputWire settings={outputWireSettings} wireOn={outputWireOn}></OutputWire>

        <MemoryBitBox x={500} y={180} size={200}></MemoryBitBox>
      </svg>
      <LargeSpace></LargeSpace>
      <div onClick={() => handleReset()}>
        Reset
      </div>
    </>
  )
}

export default MemoryBit
