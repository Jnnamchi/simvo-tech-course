interface ChipProps {
  height: number
  width: number
}

const Chip: React.FC<ChipProps> = ({ height, width }) => {
  return (
    <>
      <rect width={width} height={height} rx={20} ry={20} fill="#257a40" />
    </>
  )
}
  
export default Chip
