import { useState } from 'react'
import { Wire } from '../items/Wire'

function SimpleCircuit() {

  const height = 400
  const width = 1000
  const [wireOn, setWireOn] = useState(false)

  const pathOff = `
    M ${width / 2} ${height} ${''/* Start bottom middle */}
    L 0 ${height} ${''/* bottom left */}
    
    ${''/* Resistor Zig Zag */}
    L 0 ${height * 2 / 3}
    L -40 ${height * 1.9 / 3} 
    L 40 ${height * 1.7 / 3}
    L -40 ${height * 1.5 / 3} 
    L 40 ${height * 1.3 / 3} 
    L -40 ${height * 1.1 / 3} 
    L 0 ${height / 3}

    L 0 0 ${''/* Top left */}

    ${''/* Open Switch */}
    L ${width / 2 - 100} 0
    L ${width / 2 - 100} -20
    L ${width / 2 + 100} -120

    M ${width / 2 + 100} 0
    L ${width} 0 ${''/* Top right */}
    L ${width} ${height} ${''/* Bottom right */}
    L ${width / 2} ${height} ${''/* Start bottom middle */}
  `

  const pathOn = `
    M ${width / 2} ${height} ${''/* Start bottom middle */}
    L 0 ${height} ${''/* bottom left */}
    
    ${''/* Resistor Zig Zag */}
    L 0 ${height * 2 / 3}
    L -40 ${height * 1.9 / 3} 
    L 40 ${height * 1.7 / 3}
    L -40 ${height * 1.5 / 3} 
    L 40 ${height * 1.3 / 3} 
    L -40 ${height * 1.1 / 3} 
    L 0 ${height / 3}

    L 0 0 ${''/* Top left */}

    ${''/* Closed Switch */}
    L ${width / 2 - 100} 0
    L ${width / 2 - 100} -20
    L ${width / 2 + 100} -20
    L ${width / 2 + 100} 6

    L ${width / 2 + 100} 0
    L ${width} 0 ${''/* Top right */}
    L ${width} ${height} ${''/* Bottom right */}
    L ${width / 2} ${height} ${''/* Start bottom middle */}
  `

  return (
    <div>
      <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" overflow={'visible'}>
        <Wire
          pathOn={pathOn}
          pathOff={pathOff}
          wireOn={wireOn}
          onClickFn={() => setWireOn(!wireOn)}
        ></Wire>
        <image href="https://pngimg.com/d/battery_PNG102280.png" height="200" width="200" x={width/2 - 100} y={height - 100}/>
      </svg>
    </div>
  )
}
  
export default SimpleCircuit
  