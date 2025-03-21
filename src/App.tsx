import React from 'react';
import SnowboardSelector from './components/SnowboardSelector';
import { Layout } from 'antd';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ background: '#fff', textAlign: 'center' }}>
        <h1>滑雪板選擇器</h1>
      </Header>
      <Content style={{ padding: '24px' }}>
        <SnowboardSelector />
      </Content>
    </Layout>
  );
}

export default App; 