import React from 'react';
import { Layout} from 'antd'
import styled from 'styled-components'
import Movies from './Container/Movies'

const { Header, Footer, Content } = Layout

const StyledHeader = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: larger;
  color: aliceblue;
`

function App() {
  return (
    <Layout>
      <StyledHeader>Movies@Mariana</StyledHeader>
      <Content style={{ padding: '0 50px' }}>
        <Movies/>
      </Content>
      <Footer style={{ textAlign: 'center' }}>movie list assignment ©2023 Created by AA</Footer>
    </Layout>
  )
}

export default App;
