import anime from "animejs"
import { themeBlack, themeRed, wireChipConnectorColor } from "../constants"
import { useEffect, useRef, useState } from "react"

export interface WireProps {
  pathOn: string,
  pathOff: string,
  circleCx?: number,
  circleCy?: number,
  wireOn: boolean,
  onClickFn: any
}

export const Wire = ({ pathOn, pathOff, circleCx, circleCy, wireOn, onClickFn }: WireProps) => {

  const animateWirePathRef = useRef(null)
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() =>  {
    if (!firstRender) {
      anime({
        targets: animateWirePathRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1000,
        delay: 0
      })
    }
    setFirstRender(false)
  }, [wireOn])
  
  return (
    <svg onClick={() => onClickFn()} overflow={'visible'}>
      { wireOn ? (
          <>
            <path
              d={pathOn}
              style={{fill: 'none', stroke: themeBlack, strokeWidth: "12", borderRadius: "12px", zIndex: 2}}
            />
            <path ref={animateWirePathRef}
              d={pathOn}
              style={{fill: 'none', stroke: themeRed, strokeWidth: "12", borderRadius: "12px", zIndex: 1, cursor: 'pointer'}}
            />
          </>
        ) : (
          <>
            <path
              d={pathOff}
              style={{fill: 'none', stroke: themeRed, strokeWidth: "12", borderRadius: "12px", zIndex: 1}}
            />
            <path ref={animateWirePathRef}
              d={pathOff}
              style={{fill: 'none', stroke: themeBlack, strokeWidth: "13", borderRadius: "12px", zIndex: 2, cursor: 'pointer'}}
            />
          </>
        )}
        { (circleCx && circleCy) &&
          (<circle fill={wireChipConnectorColor} cx={circleCx} cy={circleCy} r={10}></circle>)
        }
    </svg>
  )
}