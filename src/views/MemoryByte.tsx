import { useEffect, useState } from 'react'
import { OutputWire, InputWireSwitch, CustomInputWireSwitch } from '../items/SwitchInput'
import Chip from '../items/Chip'
import MemoryBitBox from '../items/MemoryBitBox'

export interface wireSettings {
  xPos: number,
  yPos: number,
  wireOn: boolean,
  outputOn: boolean
}

const MemoryByte: React.FC = () => {

  const height = 800
  const width = 1000
  const xScale = 1.16
  const yScale = 0.4
  const resolution = 11

  const [setWireOn, setSetWireOn] = useState(false)
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

  const switchInputXPos = 1
  const switchInputYPos = 10.2
  const switchInputOpenPath = `
    M ${width * switchInputXPos / resolution} ${height * switchInputYPos / resolution}
    L ${width * (switchInputXPos + 1*xScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 2*xScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 2*xScale) / resolution} ${height * (switchInputYPos - 1.5*yScale) / resolution}
    L ${width * (switchInputXPos + 3*xScale) / resolution} ${height * (switchInputYPos - 2.3*yScale) / resolution}
    M ${width * (switchInputXPos + 3*xScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 4.4*xScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 4.4*xScale) / resolution} ${height * (switchInputYPos - 3.5*yScale) / resolution}
  `
  const switchInputClosedPath = `
    M ${width * switchInputXPos / resolution} ${height * switchInputYPos / resolution}
    L ${width * (switchInputXPos + 1*xScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 2*xScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 2*xScale) / resolution} ${height * (switchInputYPos - 1.5*yScale) / resolution}
    L ${width * (switchInputXPos + 3*xScale) / resolution} ${height * (switchInputYPos - 1.5*yScale) / resolution}
    L ${width * (switchInputXPos + 3*xScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 4.45*xScale) / resolution} ${height * (switchInputYPos - 1*yScale) / resolution}
    L ${width * (switchInputXPos + 4.45*xScale) / resolution} ${height * (switchInputYPos - 3.5*yScale) / resolution}
  `
  const setWireSettings = {
    containerHeight: height,
    containerWidth: width,
    xPos: switchInputXPos,
    yPos: switchInputYPos,
    resolution: resolution,
    xScale: xScale,
    yScale: yScale,
    pathOn: switchInputClosedPath,
    pathOff: switchInputOpenPath,
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

        {/* InputSwitch */}
        {wires.map((wire, index) => (
          <svg key={`${index}-svg`}><InputWireSwitch onClickFn={() => toggleWire(index)}
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
          <OutputWire 
            key={`${index}-output`}
            settings={{
              containerWidth: width,
              containerHeight: height,
              resolution: resolution,
              xPos: wire.xPos + 4.7*xScale,
              yPos: wire.yPos - 1.3*yScale,
              xScale: xScale,
              yScale: yScale
            }} wireOn={wire.outputOn}></OutputWire>
            <MemoryBitBox
              key={`${index}-memory`}
              x={width * (wire.xPos + 4*xScale) / resolution}
              y={height * (wire.yPos - 1.3*yScale) / resolution} size={height/resolution}></MemoryBitBox>
          </svg>
        ))}
      </svg>
      <div onClick={() => handleReset()}>
        Reset
      </div>
    </>
  )
}

export default MemoryByte
