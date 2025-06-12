import { themeBlack, memoryBitColor } from "../constants"

interface SimpleCircuitClosedProps {
  size: number
  x: number
  y: number
}

const MemoryBitBox: React.FC<SimpleCircuitClosedProps> = ({ size, x, y }) => {
  const fonSize = size / 4
  const yPos = y - (size / 2)
  return (
    <>
      <rect width={size} height={size} 
            x={x} y={yPos} fill={memoryBitColor} />
      <rect width={size} height={size} 
            x={x} y={yPos} fill='none' stroke={themeBlack} strokeWidth={4}/>
      <text 
        x={x + size / 2} 
        y={(size / 30) + yPos + size / 2} 
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={fonSize}
        fill={themeBlack}
      >
        M
      </text>
    </>
  )
}
  
export default MemoryBitBox
