import { useEffect, useState } from 'react'
import { OutputWire, InputWireSwitch, CustomInputWireSwitch } from '../items/SwitchInput'
import Chip from '../items/Chip'
import MemoryBitBox from '../items/MemoryBitBox'
import EnablerBox from '../items/EnablerBox'
import { Wire } from '../items/Wire'

export interface wireSettings {
  xPos: number,
  yPos: number,
  wireOn: boolean,
  outputOn: boolean
}

const MemoryByteEnabler: React.FC = () => {

  const height = 800
  const width = 1200
  const xScale = 0.72
  const yScale = 0.3
  const resolution = 11

  const [setWireOn, setSetWireOn] = useState(false)
  const [enableWireOn, setEnableWireOn] = useState(false)
  const [wires, setWires] = useState<wireSettings[]>([
    {
      xPos: 1,
      yPos: 2,
      wireOn: false,
      outputOn: false,
    },
    {
      xPos: 1,
      yPos: 3,
      wireOn: false,
      outputOn: false,
    },
    {
      xPos: 1,
      yPos: 4,
      wireOn: false,
      outputOn: false,
    },
    {
      xPos: 1,
      yPos: 5,
      wireOn: false,
      outputOn: false,
    },
    {
      xPos: 1,
      yPos: 6,
      wireOn: false,
      outputOn: false,
    },
    {
      xPos: 1,
      yPos: 7,
      wireOn: false,
      outputOn: false,
    },
    {
      xPos: 1,
      yPos: 8,
      wireOn: false,
      outputOn: false,
    },
    {
      xPos: 1,
      yPos: 9,
      wireOn: false,
      outputOn: false,
    }
  ])

  const setEnableWireXScale = 0.5
  const switchInputXPos = 2.8*xScale
  const switchInputYPos = 33.5*yScale
  const switchInputOpenPath = `
    M ${width * switchInputXPos / resolution} ${height * switchInputYPos / resolution}
    L ${width * (switchInputXPos + 1*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 2*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 2*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1.5*yScale) / resolution}
    L ${width * (switchInputXPos + 3*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 2.3*yScale) / resolution}
    M ${width * (switchInputXPos + 3*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 4.4*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 4.4*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 4.5*yScale) / resolution}
  `
  const switchInputClosedPath = `
    M ${width * switchInputXPos / resolution} ${height * switchInputYPos / resolution}
    L ${width * (switchInputXPos + 1*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 2*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 2*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1.5*yScale) / resolution}
    L ${width * (switchInputXPos + 3*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1.5*yScale) / resolution}
    L ${width * (switchInputXPos + 3*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 4.45*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 4.45*setEnableWireXScale) / resolution} ${height * (switchInputYPos - 4.5*yScale) / resolution}
  `
  const setWireSettings = {
    containerHeight: height,
    containerWidth: width,
    xPos: switchInputXPos,
    yPos: switchInputYPos,
    resolution: resolution,
    xScale: setEnableWireXScale,
    yScale: yScale,
    pathOn: switchInputClosedPath,
    pathOff: switchInputOpenPath,
  }

  const enableWireXPos = 6.8*xScale
  const enableWireYPos = 33.5*yScale
  const enableWireOffPath = `
    M ${(width * enableWireXPos / resolution)} ${height * enableWireYPos / resolution}
    L ${width * (enableWireXPos + 1*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1*yScale) / resolution}
    L ${width * (enableWireXPos + 2*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1*yScale) / resolution}
    L ${width * (enableWireXPos + 2*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1.5*yScale) / resolution}
    L ${width * (enableWireXPos + 3*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 2.3*yScale) / resolution}
    M ${width * (enableWireXPos + 3*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1*yScale) / resolution}
    L ${width * (enableWireXPos + 4.4*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1*yScale) / resolution}
    L ${width * (enableWireXPos + 4.4*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 4.5*yScale) / resolution}
  `
  const enableWireOnPath = `
    M ${width * enableWireXPos / resolution} ${height * enableWireYPos / resolution}
    L ${width * (enableWireXPos + 1*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1*yScale) / resolution}
    L ${width * (enableWireXPos + 2*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1*yScale) / resolution}
    L ${width * (enableWireXPos + 2*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1.5*yScale) / resolution}
    L ${width * (enableWireXPos + 3*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1.5*yScale) / resolution}
    L ${width * (enableWireXPos + 3*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1*yScale) / resolution}
    L ${width * (enableWireXPos + 4.45*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 1*yScale) / resolution}
    L ${width * (enableWireXPos + 4.45*setEnableWireXScale) / resolution} ${height * (enableWireYPos - 4.5*yScale) / resolution}
  `
  const enableWireSettings = {
    containerHeight: height,
    containerWidth: width,
    xPos: enableWireXPos,
    yPos: enableWireYPos,
    resolution: resolution,
    xScale: setEnableWireXScale,
    yScale: yScale,
    pathOn: enableWireOnPath,
    pathOff: enableWireOffPath,
  }

  const setOutput = () => {
    if (setWireOn) {
      setWires(prevWires =>
        prevWires.map((wire) =>{
          return { ...wire, outputOn: wire.wireOn }
        })
      )
    }
  }

  const toggleWire = (index: number) => {
    async function setWire () {
      setWires(prevWires =>
        prevWires.map((wire, i) =>
          i === index ? { ...wire, wireOn: !wire.wireOn } : wire
        )
      )
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutput()
    }
    setWire()
  }

  useEffect(() =>  {
    setOutput()
  }, [setWireOn])

  const handleReset = async () => {
    setWires(prevWires =>
      prevWires.map((wire) => {
        return { ...wire, wireOn: false, outputOn: false }
      })
    )
    setSetWireOn(false)
  }

  return (
    <>
      <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" overflow={'visible'}>
        {/* Computer Chip */}
        <Chip width={width} height={height} />

        {/* SetSwitch */}
        <CustomInputWireSwitch
          settings={setWireSettings}
          wireOn={setWireOn}
          onClickFn={() => setSetWireOn(!setWireOn)}>
        </CustomInputWireSwitch>

        {/* Enable Switch */}
        <CustomInputWireSwitch
          settings={enableWireSettings}
          wireOn={enableWireOn}
          onClickFn={() => setEnableWireOn(!enableWireOn)}>
        </CustomInputWireSwitch>

        {/* InputSwitch */}
        {wires.map((wire, index) => (
          <svg key={`${index}-svg`}>
            {/* Memory Set Bit */}
            <InputWireSwitch onClickFn={() => toggleWire(index)}
              key={`${index}-input`}
              settings={{
                containerWidth: width,
                containerHeight: height,
                resolution: resolution,
                xPos: wire.xPos,
                yPos: wire.yPos - 0.3*yScale,
                xScale: xScale,
                yScale: yScale
              }}
              wireOn={wire.wireOn}></InputWireSwitch>
            {/* Memory Wire */}
            <Wire 
              pathOn={`
                M ${width * (wire.xPos + 4*xScale) / resolution} ${height * (wire.yPos - 1.3*yScale) / resolution}
                L ${width * (wire.xPos + 8*xScale) / resolution} ${height * (wire.yPos - 1.3*yScale) / resolution}
              `}
              pathOff={`
                M ${width * (wire.xPos + 4*xScale) / resolution} ${height * (wire.yPos - 1.3*yScale) / resolution}
                L ${width * (wire.xPos + 8*xScale) / resolution} ${height * (wire.yPos - 1.3*yScale) / resolution}
              `}
              wireOn={wire.outputOn}
              onClickFn={() => {return}}
            />
            <OutputWire 
              key={`${index}-output`}
              settings={{
                containerWidth: width,
                containerHeight: height,
                resolution: resolution,
                xPos: wire.xPos + 8*xScale,
                yPos: wire.yPos - 1.3*yScale,
                xScale: xScale*1.5,
                yScale: yScale
              }} wireOn={wire.outputOn && enableWireOn}></OutputWire>
            <MemoryBitBox
              key={`${index}-memory`}
              x={width * (wire.xPos + 4*xScale) / resolution}
              y={height * (wire.yPos - 1.3*yScale) / resolution} size={80}></MemoryBitBox>
            <EnablerBox
              key={`${index}-enabler`}
              x={width * (wire.xPos + 8*xScale) / resolution}
              y={height * (wire.yPos - 1.3*yScale) / resolution} size={80}></EnablerBox>
          </svg>
        ))}
      </svg>
      <div onClick={() => handleReset()}>
        Reset
      </div>
    </>
  )
}

export default MemoryByteEnabler
