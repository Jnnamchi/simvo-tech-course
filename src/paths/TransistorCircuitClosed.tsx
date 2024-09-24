import anime from 'animejs';
import { forwardRef, useEffect, useRef } from 'react'
import Battery from '../items/Battery'
import Transistor from '../items/Transistor';

interface SimpleCircuitClosedProps {
  height: number
  width: number
  color: string
  run: boolean
}

const TransistorCircuitClosed = forwardRef<SVGPathElement, SimpleCircuitClosedProps>(({ height, width, color, run }) => {

  const topOffset = 100

  const transistorWidth = 200
  const transistorHeight = 80

  const initialBatteryPath = useRef(null)
  const transistorSwitchPath = useRef(null)
  const transistorBatteryEndPath = useRef(null)

  useEffect(() =>  {
    if (run) {
      async function animate() {
        // Initial Batter Path
        anime({
          targets: initialBatteryPath.current,
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1000,
          delay: 0,
        })
        // Electricity Through the Transistor
        anime({
          targets: [transistorSwitchPath.current, transistorBatteryEndPath.current],
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1000,
          delay: 800,
        })
      }
      animate()
    }
  }, [run])

  return (
    <>
      <path ref={initialBatteryPath}
        d={`
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

            ${''/* Closed Switch */}
            L ${width / 2} ${topOffset}
            // L ${width / 2 - 100} 80
            // L ${width / 2 + 100} 20
            // M ${width / 2 + 100} 100

            // L ${width} 100 ${''/* Top right */}
            // L ${width} ${height} ${''/* Bottom right */}
            // L ${width / 2} ${height} ${''/* Start bottom middle */}`
        }
        style={{fill: 'none', stroke: color, strokeWidth: "12", borderRadius: "12px"}}
      />

      <path ref={transistorSwitchPath}
        d={`
            M ${width / 2} ${topOffset} ${''/* Start in transistor */}
            L ${width / 2} -50 ${''/* Go Up */}

            ${''/* Closed Switch */}
            L 400 -50
            L 400 -70
            L 250 -70
            L 250 -50

            L 150 -50 ${''/* Go Left */}
            L 150 ${topOffset} ${''/* Go back into circuit */}
        `}
      
        style={{fill: 'none', stroke: color, strokeWidth: "12", borderRadius: "12px"}}
      />

      <path ref={transistorBatteryEndPath}
        d={`
          M ${width / 2} ${topOffset} ${''/* Start top middle */}
          L ${width} ${topOffset} ${''/* Top right */}
          L ${width} ${height} ${''/* Bottom right */}
          L ${width / 2} ${height} ${''/* Start bottom middle */}
        `}
        style={{fill: 'none', stroke: color, strokeWidth: "12", borderRadius: "12px"}}
      />

      <Transistor width={transistorWidth} height={transistorHeight} 
        x={width/2 - transistorWidth/2}
        xinner={width/2 - transistorWidth/6}
        y={transistorHeight / 2 + (topOffset - transistorHeight)}
      ></Transistor>

      <Battery height={height} width={width}></Battery>
    </>
  )
})
  
export default TransistorCircuitClosed
  