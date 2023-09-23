import { Card, Spin, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react'
import CourseCard from '../Cards/CourseCard';

const ContentComponent = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        const response = await fetch('https://sih-ml.onrender.com/get_data');
        const data = await response.json();
        setData(data);
        setLoading(false);
    }


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>

            <Content >
                <Typography.Title level={3} style={{ textAlign: 'center' }}>Trending Courses</Typography.Title>

                <div className="card-container">

                    {loading ? (
                        <Spin />
                    ) : (
                        data.map((item, index) => (
                            <CourseCard key={index} data={item} />
                        ))
                    )}
                </div>

            </Content>

        </>
    )
}

export default ContentComponent