import { useState } from 'react'
import { Wire } from '../items/Wire'
import Transistor from '../items/Transistor'
import Chip from '../items/Chip'
import { wireChipConnectorColor } from '../constants'

function TransistorCircuitChip() {

  const height = 400
  const width = 1000

  const [wireOn, setWireOn] = useState(false)

  const pathOff = `
    M ${width * 6.5 / 10} ${height * 6 / 10} ${''/* bottom left */}
    L ${width * 5 / 10} ${height * 3 / 10} ${''/* bottom left */}
    L ${width * 4 / 10} ${height * 3 / 10} ${''/* bottom left */}
    L ${width * 4 / 10} ${height * 2.5 / 10} ${''/* bottom left */}
    L ${width * 3 / 10} ${height * 1.5 / 10} ${''/* bottom left */}
    M ${width * 3 / 10} ${height * 3 / 10} ${''/* bottom left */}
    L ${width * 2 / 10} ${height * 3 / 10} ${''/* bottom left */}
    L ${width * 1 / 10} ${height * 4 / 10} ${''/* Start bottom middle */}  
  `
  const pathOn = `
    M ${width * 6.5 / 10} ${height * 6 / 10} ${''/* bottom left */}
    L ${width * 5 / 10} ${height * 3 / 10} ${''/* bottom left */}
    L ${width * 4 / 10} ${height * 3 / 10} ${''/* bottom left */}
    L ${width * 4 / 10} ${height * 2.5 / 10} ${''/* bottom left */}
    L ${width * 3 / 10} ${height * 2.5 / 10} ${''/* bottom left */}
    L ${width * 3 / 10} ${height * 3 / 10} ${''/* bottom left */}
    L ${width * 2 / 10} ${height * 3 / 10} ${''/* bottom left */}
    L ${width * 1 / 10} ${height * 4 / 10} ${''/* Start bottom middle */}  
  `
  const pathOff2 = `
    M ${width * 1 / 10} ${height * 7 / 10} ${''/* Start bottom middle */}
    L ${width * 2 / 10} ${height * 6 / 10} ${''/* bottom left */}
    L ${width * 8 / 10} ${height * 6 / 10} ${''/* bottom left */}
    L ${width * 9 / 10} ${height * 7 / 10} ${''/* bottom left */}
  `
  const pathOn2 = `
    M ${width * 1 / 10} ${height * 7 / 10} ${''/* Start bottom middle */}
    L ${width * 2 / 10} ${height * 6 / 10} ${''/* bottom left */}
    L ${width * 8 / 10} ${height * 6 / 10} ${''/* bottom left */}
    L ${width * 9 / 10} ${height * 7 / 10} ${''/* bottom left */}
  `

  return (
    <div>
      <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" overflow={'visible'}>
        <Chip width={width} height={height} />
        {/* Wires */}
        <Wire
          pathOn={pathOn}
          pathOff={pathOff}
          wireOn={wireOn}
          onClickFn={() => setWireOn(!wireOn)}
        ></Wire>
        <Wire
          pathOn={pathOn2}
          pathOff={pathOff2}
          wireOn={wireOn}
          onClickFn={() => setWireOn(!wireOn)}
        ></Wire>
        {/* Other Items */}
        <Transistor height={80} width={200} x={width * 5 / 10} xinner={width * 5.7 / 10} y={height * 5 / 10}></Transistor>
        <circle fill={wireChipConnectorColor} cx={width * 1 / 10} cy={height * 4 / 10} r={10}></circle>
        <circle fill={wireChipConnectorColor} cx={width * 1 / 10} cy={height * 7 / 10} r={10}></circle>
        <circle fill={wireChipConnectorColor} cx={width * 9 / 10} cy={height * 7 / 10} r={10}></circle>
      </svg>
    </div>
  )
}
  
export default TransistorCircuitChip