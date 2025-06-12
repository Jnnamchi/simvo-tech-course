import { themeBlack, memoryBitColor, registerOnBitValue, registerOffBitValue } from "../constants"

interface SimpleCircuitClosedProps {
  size: number
  x: number
  y: number
  values?: number[]
}

const RegisterBox: React.FC<SimpleCircuitClosedProps> = ({ size, x, y }) => {
  const fontSize = size / 4
  const yPos = y - (size / 2)

  const width = size
  const height = size * 4
  const valuesSize = height / 8
  const valuesFontSize = fontSize / 2
  const values = [1, 0, 1, 0, 0, 0, 0, 0]
  return (
    <>
      {values.map((value, index) => (
        <>
          {
            value == 1 ? (
              <rect
                width={valuesSize} height={valuesSize}
                x={x} y={yPos-valuesSize + (index+1)*valuesSize} fill={registerOnBitValue}
              >
              </rect>
            ) : (
              <rect
                width={valuesSize} height={valuesSize}
                x={x} y={yPos-valuesSize + (index+1)*valuesSize} fill={registerOffBitValue}
              >
              </rect>
            )
          }
          <rect
            width={valuesSize} height={valuesSize}
            x={x} y={yPos-valuesSize + (index+1)*valuesSize} fill='none' stroke={themeBlack} strokeWidth={4}
          >
          </rect>
          <text
            x={x + valuesSize/2}
            y={yPos-valuesSize + (index+1)*valuesSize + valuesSize/2} 
            dominantBaseline='middle'
            textAnchor='middle'
            fontSize={valuesFontSize}
            fill={themeBlack}
          >
            {value}
          </text>
        </>
      ))}
      <rect width={width} height={height} 
            x={x+valuesSize} y={yPos} fill={memoryBitColor} />
      <rect width={width} height={height} 
            x={x+valuesSize} y={yPos} fill='none' stroke={themeBlack} strokeWidth={4}/>
      <text
        x={valuesSize + x + width / 2} 
        y={(height / 30) + yPos + height / 2} 
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize}
        fill={themeBlack}
      >
        R
      </text>
    </>
  )
}
  
export default RegisterBox
