interface SimpleCircuitClosedProps {
  height: number
  width: number
  x: number
  y: number
  xinner: number
}

const Transistor: React.FC<SimpleCircuitClosedProps> = ({ height, width, x, y, xinner }) => {
  return (
    <>
      <rect width={width} height={height} 
            x={x} y={y} rx="5" ry="5" fill="blue" />
      <rect width={width / 3} height={height} 
            x={xinner} y={y} fill="orange" />
    </>
  )
}
  
export default Transistor
  