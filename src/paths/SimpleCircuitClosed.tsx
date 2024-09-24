import anime from 'animejs';
import { forwardRef, useEffect, useRef } from 'react'

interface SimpleCircuitClosedProps {
  height: number;
  width: number;
  color: string;
  run: boolean;
}

const SimpleCircuitClosed = forwardRef<SVGPathElement, SimpleCircuitClosedProps>(({ height, width, color, run }, ref) => {

  const pathRef = useRef(null)

  useEffect(() =>  {
    if (run) {
      anime({
        targets: pathRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        delay: 500,
      })
    }
  }, [run])

  return (
    <>
      <path ref={pathRef}
        d={`
            
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
            L ${width / 2 + 100} 0

            L ${width} 0 ${''/* Top right */}
            L ${width} ${height} ${''/* Bottom right */}
            Z`
      }
      style={{fill: 'none', stroke: color, strokeWidth: "12", borderRadius: "12px"}}/>
      <image href="https://pngimg.com/d/battery_PNG102280.png" height="200" width="200" x={width/2 - 100} y={height - 100}/>
    </>
  )
})
  
export default SimpleCircuitClosed
  