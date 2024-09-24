import styled from "styled-components"

// Spacing
export const standardPadding = '25px'

// Colors
export const textPrimaryColor = '#4d5054'
export const themePrimaryColor = '#F2EEE9'
export const themeRed = '#f36165'

// Elements
export const PageTitle = styled.div`
  color: ${textPrimaryColor};
  font-size: 23px;
  width: 100%;
  text-align: center;
  font-weight: bold;
`
export const PageSubTitle = styled.div`
  color: ${textPrimaryColor};
  font-size: 17px;
  width: 100%;
  text-align: center;
`

export const SectionTitle = styled.div`
  color: ${textPrimaryColor};
  font-size: 18px;
  width: 100%;
  text-align: left;
  font-weight: bold;
`

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const Card = styled.div`
  background-color: white;
  padding: ${standardPadding};
  border-radius: 8px;
`

export const BodyContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`

export const StandardSpace = styled.div`
  margin-bottom: ${standardPadding}
`

export const LargeSpace = styled.div`
  margin-bottom: calc(2 * ${standardPadding})
`

export const CenterText = styled.div`
  text-align: center;
`

export const MainActionButton = styled.div`
  color: ${textPrimaryColor};
  background-color: ${themePrimaryColor};
  width: fit-content;
  font-size: 18px;
  border: solid ${textPrimaryColor} 2px;
  border-radius: 8px;
  font-weight: bold;
  padding: ${standardPadding};
  transition: background-color 0.5s;

  &:hover {
    cursor: pointer;
    background-color: ${textPrimaryColor};
    color: ${themePrimaryColor};
  }
`

export const VerticalAlignContainer = styled.div`
  width: 100%;
  height: 100%;
  display: table;
`

export const VerticalAlignContent = styled.div`
  display: table-cell;
  vertical-align: middle;
`