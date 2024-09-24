import { useState } from 'react'
import './App.css'
import styled from 'styled-components'
import { themePrimaryColor, standardPadding, textPrimaryColor, VerticalAlignContainer, VerticalAlignContent } from './constants'

import SimpleCircuitClosedView from './views/SimpleCircuitClosed'
import SimpleCircuitOpenView from './views/SimpleCircuitOpen' 
import TransistorCircuitClosedView from './views/TransistorCircuitClosed'
import TransistorCircuitOpenView from './views/TransistorCircuitOpen'
import TransistorCircuitClosedChipView from './views/TransistorCircuitClosedChip'
import TransistorCircuitOpenChipView from './views/TransistorCircuitOpenChip'

const pages = [
  {
    name: 'Simple Circuit Open',
    component: <SimpleCircuitOpenView></SimpleCircuitOpenView>
  },
  {
    name: 'Simple Circuit Closed',
    component: <SimpleCircuitClosedView></SimpleCircuitClosedView>
  },
  {
    name: 'Transistor Circuit Open',
    component: <TransistorCircuitOpenView></TransistorCircuitOpenView>
  },
  {
    name: 'Transistor Circuit Closed',
    component: <TransistorCircuitClosedView></TransistorCircuitClosedView>
  },
  {
    name: 'Transistor Circuit Open (Chip)',
    component: <TransistorCircuitOpenChipView></TransistorCircuitOpenChipView>
  },
  {
    name: 'Transistor Circuit Closed (Chip)',
    component: <TransistorCircuitClosedChipView></TransistorCircuitClosedChipView>
  },
]

const NavBarContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  background: ${themePrimaryColor};
`;

const NavBarItem = styled.div`
  margin: ${standardPadding};
  padding: 5px 10px;
  border-radius: 20px;
  background: none;
  color: ${textPrimaryColor};
  border: solid ${textPrimaryColor} 1px;
  &:hover{
    cursor: pointer;
    background-color: ${textPrimaryColor};
    color: ${themePrimaryColor};
    border: solid ${themePrimaryColor} 1px;
  }
`;

const NavBarItemSelected = styled.div`
  margin: ${standardPadding};
  padding: 5px 10px;
  border-radius: 20px;   
  background-color: ${textPrimaryColor};
  color: ${themePrimaryColor};
  border: solid ${themePrimaryColor} 1px;
`;

const PageContent = styled.div`
  background: ${themePrimaryColor};
  height: calc(100vh - 87px);
  padding: ${standardPadding};
  color: ${textPrimaryColor};
`;

function App() {
  const [currentPage, setPage] = useState<any>(pages[0])

  return (
    <>
      <NavBarContainer>
        {pages.map((page) => (page.name === currentPage.name ? (
          <NavBarItemSelected key={page.name} onClick={() => setPage(page)}>
            {page.name}
          </NavBarItemSelected>
        ) : (
          <NavBarItem key={page.name} onClick={() => setPage(page)}>
            {page.name}
          </NavBarItem>
        )))}
      </NavBarContainer>
      <PageContent>
        <VerticalAlignContainer>
          <VerticalAlignContent>
            <div style={{border: 'none', padding: '50px', textAlign: 'center'}}>
              {currentPage.component}
            </div>
          </VerticalAlignContent>
        </VerticalAlignContainer>
      </PageContent>
    </>
  )
}

export default App
