import React, {useState, useEffect} from 'react';

const Profile = () => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const getUserData = async ()=>{
        const res = fetch('http://127.0.0.1:5000/')
    }

    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}

export default Profile;
