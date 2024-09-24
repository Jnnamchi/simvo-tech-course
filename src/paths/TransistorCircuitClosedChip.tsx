import anime from 'animejs';
import { forwardRef, useEffect, useRef } from 'react'
import Transistor from '../items/Transistor';

interface SimpleCircuitClosedProps {
  height: number
  width: number
  color: string
  showChip: boolean
  run: boolean
}

const TransistorCircuitClosedChip = forwardRef<SVGPathElement, SimpleCircuitClosedProps>(({ height, width, color, showChip, run }) => {

  const initialBatteryPath = useRef(null)
  const transistorSwitchPath = useRef(null)

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
          targets: [transistorSwitchPath.current],
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1000,
          delay: 400,
        })
      }
      animate()
    }
  }, [run])

  return (
    <>
      { showChip && (
        <rect width={width} height={height} rx={20} ry={20} fill="#257a40" />
      )}
      
      <path ref={transistorSwitchPath}
        d={`
            M ${width * 6.5 / 10} ${height * 6 / 10} ${''/* bottom left */}
            L ${width * 5 / 10} ${height * 3 / 10} ${''/* bottom left */}
            L ${width * 4 / 10} ${height * 3 / 10} ${''/* bottom left */}
            L ${width * 4 / 10} ${height * 2.5 / 10} ${''/* bottom left */}
            L ${width * 3 / 10} ${height * 2.5 / 10} ${''/* bottom left */}
            L ${width * 3 / 10} ${height * 3 / 10} ${''/* bottom left */}
            L ${width * 2 / 10} ${height * 3 / 10} ${''/* bottom left */}
            L ${width * 1 / 10} ${height * 4 / 10} ${''/* Start bottom middle */}  
            `
        }
        style={{fill: 'none', stroke: color, strokeWidth: "12", borderRadius: "12px"}}
      />

      <path ref={initialBatteryPath}
        d={`
            M ${width * 1 / 10} ${height * 7 / 10} ${''/* Start bottom middle */}
            L ${width * 2 / 10} ${height * 6 / 10} ${''/* bottom left */}
            L ${width * 8 / 10} ${height * 6 / 10} ${''/* bottom left */}
            L ${width * 9 / 10} ${height * 7 / 10} ${''/* bottom left */}
            `
        }
        style={{fill: 'none', stroke: color, strokeWidth: "12", borderRadius: "12px"}}
      />

      <Transistor height={80} width={200} x={width * 5 / 10} xinner={width * 5.7 / 10} y={height * 5 / 10}></Transistor>

      <circle cx={width * 1 / 10} cy={height * 4 / 10} r={10}></circle>
      <circle cx={width * 1 / 10} cy={height * 7 / 10} r={10}></circle>
      <circle cx={width * 9 / 10} cy={height * 7 / 10} r={10}></circle>
    </>
  )
})

export default TransistorCircuitClosedChip
  