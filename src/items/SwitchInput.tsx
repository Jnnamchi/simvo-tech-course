import anime from "animejs"
import { useEffect, useRef, useState } from "react"
import { themeBlack, themeRed, wireChipConnectorColor } from "../constants"

export interface SwitchInputProps {
  containerHeight: number
  containerWidth: number
  xPos: number
  yPos: number
  resolution: number
  xScale: number
  yScale: number
}

export const GetSwitchClosedInputPath = ({ containerHeight, containerWidth, yPos, xPos, resolution, xScale, yScale }: SwitchInputProps) => {
  return `
    M ${containerWidth * xPos / resolution} ${containerHeight * yPos / resolution}
    L ${containerWidth * (xPos + 1*xScale) / resolution} ${containerHeight * (yPos - 1*yScale) / resolution}
    L ${containerWidth * (xPos + 2*xScale) / resolution} ${containerHeight * (yPos - 1*yScale) / resolution}
    L ${containerWidth * (xPos + 2*xScale) / resolution} ${containerHeight * (yPos - 1.5*yScale) / resolution}
    L ${containerWidth * (xPos + 3*xScale) / resolution} ${containerHeight * (yPos - 1.5*yScale) / resolution}
    L ${containerWidth * (xPos + 3*xScale) / resolution} ${containerHeight * (yPos - 1*yScale) / resolution}
    L ${containerWidth * (xPos + 4*xScale) / resolution} ${containerHeight * (yPos - 1*yScale) / resolution}
  `
}

export const GetSwitchOpenInputPath = ({ containerHeight, containerWidth, yPos, xPos, resolution, xScale, yScale }: SwitchInputProps) => {
  return `
    M ${containerWidth * xPos / resolution} ${containerHeight * yPos / resolution}
    L ${containerWidth * (xPos + 1*xScale) / resolution} ${containerHeight * (yPos - 1*yScale) / resolution}
    L ${containerWidth * (xPos + 2*xScale) / resolution} ${containerHeight * (yPos - 1*yScale) / resolution}
    L ${containerWidth * (xPos + 2*xScale) / resolution} ${containerHeight * (yPos - 1.5*yScale) / resolution}
    L ${containerWidth * (xPos + 3*xScale) / resolution} ${containerHeight * (yPos - 2.3*yScale) / resolution}
    M ${containerWidth * (xPos + 3*xScale) / resolution} ${containerHeight * (yPos - 1*yScale) / resolution}
    L ${containerWidth * (xPos + 4*xScale) / resolution} ${containerHeight * (yPos - 1*yScale) / resolution}
  `
}

export const GetOutputWirePath = ({ containerHeight, containerWidth, yPos, xPos, resolution, xScale, yScale }: SwitchInputProps) => {
  return `
    M ${containerWidth * xPos / resolution} ${containerHeight * yPos / resolution}
    L ${containerWidth * (xPos + 2*xScale) / resolution} ${containerHeight * yPos / resolution}
    L ${containerWidth * (xPos + 3*xScale) / resolution} ${containerHeight * (yPos + 1*yScale) / resolution}
  `
}

export const OutputWire = ({ settings, wireOn }: { settings: SwitchInputProps; wireOn: boolean }) => {
  const animateWirePathRef = useRef(null)
  const [firstRender, setFirstRender] = useState(true)
  
  const circleCx = settings.containerWidth * (settings.xPos + 3*settings.xScale) / settings.resolution
  const circleCy = settings.containerHeight * (settings.yPos + 1*settings.yScale) / settings.resolution

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
    <>
      { wireOn ? (
          <>
            <path
              d={GetOutputWirePath(settings)}
              style={{fill: 'none', stroke: themeBlack, strokeWidth: "12", borderRadius: "12px", zIndex: 2}}
            />
            <path ref={animateWirePathRef}
              d={GetOutputWirePath(settings)}
              style={{fill: 'none', stroke: themeRed, strokeWidth: "12", borderRadius: "12px", zIndex: 1}}
            />
          </>
        ) : (
          <>
            <path
              d={GetOutputWirePath(settings)}
              style={{fill: 'none', stroke: themeRed, strokeWidth: "12", borderRadius: "12px", zIndex: 1}}
            />
            <path ref={animateWirePathRef}
              d={GetOutputWirePath(settings)}
              style={{fill: 'none', stroke: themeBlack, strokeWidth: "13", borderRadius: "12px", zIndex: 2}}
            />
          </>
        )}
        <circle fill={wireChipConnectorColor} cx={circleCx} cy={circleCy} r={10}></circle>
    </>
  )
}

export const InputWireSwitch = ({ settings, wireOn, onClickFn }: { settings: SwitchInputProps; wireOn: boolean, onClickFn: any }) => {

  const animateWirePathRef = useRef(null)
  const [firstRender, setFirstRender] = useState(true)

  const circleCx = settings.containerWidth * settings.xPos / settings.resolution
  const circleCy = settings.containerHeight * settings.yPos / settings.resolution

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
    <svg onClick={() => onClickFn()}>
      { wireOn ? (
          <>
            <path
              d={GetSwitchClosedInputPath(settings)}
              style={{fill: 'none', stroke: themeBlack, strokeWidth: "12", borderRadius: "12px", zIndex: 2}}
            />
            <path ref={animateWirePathRef}
              d={GetSwitchClosedInputPath(settings)}
              style={{fill: 'none', stroke: themeRed, strokeWidth: "12", borderRadius: "12px", zIndex: 1, cursor: 'pointer'}}
            />
          </>
        ) : (
          <>
            <path
              d={GetSwitchOpenInputPath(settings)}
              style={{fill: 'none', stroke: themeRed, strokeWidth: "12", borderRadius: "12px", zIndex: 1}}
            />
            <path ref={animateWirePathRef}
              d={GetSwitchOpenInputPath(settings)}
              style={{fill: 'none', stroke: themeBlack, strokeWidth: "13", borderRadius: "12px", zIndex: 2, cursor: 'pointer'}}
            />
          </>
        )}
        <circle fill={wireChipConnectorColor} cx={circleCx} cy={circleCy} r={10}></circle>
    </svg>
  )
}

export interface CustomSwitchInputProps {
  containerHeight: number
  containerWidth: number
  xPos: number
  yPos: number
  resolution: number
  xScale: number
  yScale: number,
  pathOn: string,
  pathOff: string
}

export const CustomInputWireSwitch = ({ settings, wireOn, onClickFn }: { settings: CustomSwitchInputProps; wireOn: boolean, onClickFn: any }) => {

  const animateWirePathRef = useRef(null)
  const [firstRender, setFirstRender] = useState(true)

  const circleCx = settings.containerWidth * settings.xPos / settings.resolution
  const circleCy = settings.containerHeight * settings.yPos / settings.resolution

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
    <svg onClick={() => onClickFn()}>
      { wireOn ? (
          <>
            <path
              d={settings.pathOn}
              style={{fill: 'none', stroke: themeBlack, strokeWidth: "12", borderRadius: "12px", zIndex: 2}}
            />
            <path ref={animateWirePathRef}
              d={settings.pathOn}
              style={{fill: 'none', stroke: themeRed, strokeWidth: "12", borderRadius: "12px", zIndex: 1, cursor: 'pointer'}}
            />
          </>
        ) : (
          <>
            <path
              d={settings.pathOff}
              style={{fill: 'none', stroke: themeRed, strokeWidth: "12", borderRadius: "12px", zIndex: 1}}
            />
            <path ref={animateWirePathRef}
              d={settings.pathOff}
              style={{fill: 'none', stroke: themeBlack, strokeWidth: "13", borderRadius: "12px", zIndex: 2, cursor: 'pointer'}}
            />
          </>
        )}
        <circle fill={wireChipConnectorColor} cx={circleCx} cy={circleCy} r={10}></circle>
    </svg>
  )
}