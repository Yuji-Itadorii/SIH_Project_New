import { useState } from 'react'
import './App.css'
import { Avatar, Layout, Space } from 'antd'
import { Footer, Header } from 'antd/es/layout/layout'
import Card from './components/Cards/CourseCard'
import Typography from 'antd/es/typography/Typography'
import ContentComponent from './components/ContnentComponent/ContentComponent'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecommendComponent from './components/RecommendComponent/RecommendComponent'
import Login from "./components/Login/Loginform"
import SignUp from './components/SignUp/Signup';
import Profile from './components/Profile/Profile'
import { UserOutlined } from '@ant-design/icons';

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const items = [
  {
    label: <Link to="/">Home</Link>,
    key: '1',
    // icon: < DashOutlined />,
  },
  {
    label: <Link to="/recommend_page">Recommend Courses</Link>,
    key: '2',
    // icon: < DashOutlined />,
  },
];



function App() {

  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      {/* <Router> */}
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
        size={[0, 48]}
      >

        <Layout>
          <Header style={headerStyle} >
            {/* <Typography.Title level={2} style={{ color: '#fff' }}>Course Recommender</Typography.Title> */}

            <Space direction='horizontal' size={50} style={{
              textAlign: 'center',
              width: '100%',
              justifyContent: 'space-between'
            }}>
              <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
              <Link to="/profile">
                <Avatar icon={<UserOutlined />} />
              </Link>
            </Space>

          </Header>

          <Routes>
            <Route path="/" element={<ContentComponent />} />
            <Route path="/recommend_page" element={<RecommendComponent />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
          <Footer>
            <Typography.Title level={5} style={{ textAlign: 'center' }}>Made with ❤️ by
              HexaTitans
            </Typography.Title>
          </Footer>
        </Layout>
      </Space>
      {/* </Router> */}
    </>
  )
}

export default App