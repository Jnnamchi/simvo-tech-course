interface SimpleCircuitClosedProps {
  height: number
  width: number
}

const Battery: React.FC<SimpleCircuitClosedProps> = ({ height, width }) => {
  return (
    <image href="https://pngimg.com/d/battery_PNG102280.png" height="200" width="200" x={width/2 - 100} y={height - 100}/>
  )
}
  
export default Battery
  