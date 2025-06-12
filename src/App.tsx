import { useState } from 'react'
import './App.css'
import styled from 'styled-components'
import { themePrimaryColor, standardPadding, textPrimaryColor, VerticalAlignContainer, VerticalAlignContent } from './constants'

import SimpleCircuit from './views/SimpleCircuit' 
import TransistorCircuit from './views/TransistorCircuit'
import TransistorCircuitChip from './views/TransistorCircuitChip'
import MemoryBit from './views/MemoryBit'
import MemoryByte from './views/MemoryByte'
import MemoryByteEnabler from './views/MemoryByteEnabler'
import Register from './views/Register'

const pages = [
  {
    name: 'Simple Circuit',
    component: <SimpleCircuit></SimpleCircuit>
  },
  {
    name: 'Transistor Circuit',
    component: <TransistorCircuit></TransistorCircuit>
  },
  {
    name: 'Transistor Circuit (Chip)',
    component: <TransistorCircuitChip></TransistorCircuitChip>
  },
  {
    name: 'Memory Bit',
    component: <MemoryBit></MemoryBit>
  },
  {
    name: 'Memory Byte',
    component: <MemoryByte></MemoryByte>
  },
  {
    name: 'Memory Byte + Enabler',
    component: <MemoryByteEnabler></MemoryByteEnabler>
  },
  {
    name: 'Register',
    component: <Register></Register>
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
