import { Space, Spin } from 'antd'
import React, { useState } from 'react'
import { Input } from 'antd';
import axios from 'axios';
const { Search } = Input;
import './RecommendComponent.css'
import CourseCard from '../Cards/CourseCard';





const RecommendComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getRecommendations(query) {
        setLoading(true);
        const response = await axios.get(`https://sih-ml.onrender.com/recommend/${query}`);
        setData(response.data);
        setLoading(false);
    }


    const onSearch = (value, _e, info) => {
        getRecommendations(value);
    };

    console.log(data);
    return (

        <>
            <div className="recommend-container">
                <Space direction="vertical" className="recommend-container" size={[0, 48]}>
                    <Search
                        placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        name='user_input'
                        style={{
                            width: "70vw",
                            marginTop: "2rem",
                        }}
                    />

                    <div className="recommended-cards">
                        {loading ? (<Spin />) : (data.length > 1 ? (
                            data.map((item, index) => (
                                <CourseCard key={index} data={item} />
                            ))
                        ) : (
                            <h1></h1>
                        ))
                        }
                    </div>


                </Space>
            </div>
        </>
    )
}

export default RecommendComponent