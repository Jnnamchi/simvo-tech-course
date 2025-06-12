import { useState } from 'react'
import { Wire } from '../items/Wire'
import Transistor from '../items/Transistor'
import Battery from '../items/Battery'

function TransistorCircuit() {

  const height = 400
  const width = 1000
  const topOffset = 100

  const transistorWidth = 200
  const transistorHeight = 80

  const [wireOn, setWireOn] = useState(false)

  const pathOff = `
    M 100 -50 ${''/* Go Left */}
    L 0 -50
    L 0 ${topOffset} ${''/* Go back into circuit */}
    L ${width / 2} ${topOffset} ${''/* Start in transistor */}
    L ${width / 2} -50 ${''/* Go Up */}

    ${''/* Open Switch */}
    L 400 -50
    M 400 -120
    L 300 -70
    L 300 -50

    L 200 -50 ${''/* Go Left */}
  `
  const pathOn = `
    M 100 -50 ${''/* Go Left */}
    L 0 -50
    L 0 ${topOffset} ${''/* Go back into circuit */}
    L ${width / 2} ${topOffset} ${''/* Start in transistor */}
    L ${width / 2} -50 ${''/* Go Up */}

    ${''/* Open Switch */}
    L 400 -50
    L 400 -70
    L 300 -70
    L 300 -50

    L 200 -50 ${''/* Go Left */}
  `
  const pathOff2 = `
    M ${width / 2} ${height} ${''/* Start bottom middle */}
    L 0 ${height} ${''/* bottom left */}
    
    ${''/* Resistor Zig Zag */}
    L 0 ${height * 2 / 3 + 200*(topOffset / height)}
    L -40 ${height * 1.9 / 3 +  200*(topOffset / height)} 
    L 40 ${height * 1.7 / 3 +  200*(topOffset / height)}
    L -40 ${height * 1.5 / 3 +  200*(topOffset / height)} 
    L 40 ${height * 1.3 / 3 +  200*(topOffset / height)} 
    L -40 ${height * 1.1 / 3 +  200*(topOffset / height)} 
    L 0 ${height / 3 +  200*(topOffset / height)}

    L 0 ${topOffset} ${''/* Top left */}
  
    L ${width / 2} ${topOffset} ${''/* Start top middle */}
    L ${width} ${topOffset} ${''/* Top right */}
    L ${width} ${height} ${''/* Bottom right */}
    L ${width / 2} ${height} ${''/* Start bottom middle */}
  `
  const pathOn2 = `
    M ${width / 2} ${height} ${''/* Start bottom middle */}
    L 0 ${height} ${''/* bottom left */}
    
    ${''/* Resistor Zig Zag */}
    L 0 ${height * 2 / 3 + 200*(topOffset / height)}
    L -40 ${height * 1.9 / 3 +  200*(topOffset / height)} 
    L 40 ${height * 1.7 / 3 +  200*(topOffset / height)}
    L -40 ${height * 1.5 / 3 +  200*(topOffset / height)} 
    L 40 ${height * 1.3 / 3 +  200*(topOffset / height)} 
    L -40 ${height * 1.1 / 3 +  200*(topOffset / height)} 
    L 0 ${height / 3 +  200*(topOffset / height)}

    L 0 ${topOffset} ${''/* Top left */}

    L ${width / 2} ${topOffset} ${''/* Start top middle */}
    L ${width} ${topOffset} ${''/* Top right */}
    L ${width} ${height} ${''/* Bottom right */}
    L ${width / 2} ${height} ${''/* Start bottom middle */}
  `

  return (
    <div>
      <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" overflow={'visible'}>
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
        <Transistor width={transistorWidth} height={transistorHeight} 
          x={width/2 - transistorWidth/2}
          xinner={width/2 - transistorWidth/6}
          y={transistorHeight / 2 + (topOffset - transistorHeight)}
        ></Transistor>
        <Battery height={-50} width={280}></Battery>
        <Battery height={height} width={width}></Battery>
      </svg>
    </div>
  )
}
  
export default TransistorCircuit
  