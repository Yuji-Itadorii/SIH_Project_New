import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Avatar, Button, Space, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

const Profile = () => {
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    const checkLoggedIn = async () => {
        console.log("checking logged in");
        const response = await fetch('/api/auth/isLoggedIn', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        setIsLoggedIn(data);
        setLoading(false);
    }


    const getUserData = async () => {
        const response = await fetch('/api/auth/getuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        // console.log(data);
        setUser(data);
    }

    useEffect(() => {
        checkLoggedIn();
        getUserData();
    }, [])

    if (!isLoggedIn) {
        return (
            <h1>Not Logged In</h1>
        )
    }
    else if (loading) {
        return (
            <Spin size="large" />
        )
    }
    else {
        return (
            <>
                <div className="profile-comtainer">
                    <Avatar
                        size={100}
                        icon={<UserOutlined />}
                        src="https://api.dicebear.com/7.x/bottts/svg?seed=abhay"
                    />

                    {user ? <Space direction="vertical">
                        <h1>{user.fname} {user.lname}</h1>
                        <h2>{user.email}</h2>
                        <h2>{user.role}</h2>
                        <h2>{user.contact}</h2>
                        {/* <h2></h2> */}
                        {/* <h2>Education</h2> */}
                        {/* <h2>Instution</h2> */}
                        {user.role === "teacher" || user.role === "admin" ? <Button  >
                            <Link href="/addCourses">Add Courses</Link>
                        </Button> : null}
                    </Space> : <h1>loading....</h1>}
                </div>
            </>
        );
    }


}

export default Profile;
