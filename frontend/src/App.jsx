import { useState } from 'react'
import './App.css'
import { Avatar, Button, Layout, Space } from 'antd'
import { Footer, Header } from 'antd/es/layout/layout'
import Card from './components/Cards/CourseCard'
import Typography from 'antd/es/typography/Typography'
import ContentComponent from './components/ContnentComponent/ContentComponent'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecommendComponent from './components/RecommendComponent/RecommendComponent'
import Login from "./components/Login/Loginform"
import LoginFormNew from "./components/Login/LoginFormNew"
import SignUp from './components/SignUp/Signup';
import Profile from './components/Profile/Profile'
import { UserOutlined } from '@ant-design/icons';
import AddCoursesComponent from './components/AddCoursesComponent/AddCoursesComponent'
import AllCoursesComponent from './components/AllCoursesComponent/AllCoursesComponent'
import UpdateCourses from './components/UpdateCourses/UpdateCourses'
import CourseCard from './components/Cards/CourseCard'
import OneCourseComponent from './components/OneCourseComponent/OneCourseComponent'
import AddReviews from './components/AddReviews/AddReviews'
import LoginForm from './components/Login/Loginform'

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  paddingInline: 50,
  lineHeight: '64px',
  marginBottom: "1rem",
  backgroundColor: '#7dbcea',
};

const items = [
  {
    label: <Link to="/">Home</Link>,
    key: '1',
  },
  {
    label: <Link to="/recommend_page">Recommend Courses</Link>,
    key: '2',
  },
];

const items2 = [
  {
    label: <Link to="/login">Login</Link>,
    key: '3',
  }
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

              <div className='menu-container' >

                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" forceSubMenuRender={true} items={items} />

                <Button style={{ marginLeft: '1rem', height: '3rem', backgroundColor: 'white' }} >
                  <Link to="/login">Login</Link>
                </Button>
              </div>

              <Link to="/profile">
                <Avatar src="https://api.dicebear.com/7.x/bottts/svg?seed=abhay" />
              </Link>
            </Space>

          </Header>

          <Routes>
            <Route path="/" element={<ContentComponent />} />
            <Route path="/recommend_page" element={<RecommendComponent />} />
            <Route path='/login' element={<LoginFormNew />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/addCourses' element={<AddCoursesComponent />} />
            <Route path='/all_courses' element={<AllCoursesComponent />} />
            <Route path='/updatecourses/:id' element={<UpdateCourses />} />
            <Route path='/course/:id' element={<OneCourseComponent />} />
            <Route path='/review/:id' element={<AddReviews />} />
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