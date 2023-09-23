import React from 'react'
import { Card, Rate, Space, Typography } from 'antd'
const { Meta } = Card;

const CourseCard = ({ data }) => {

    return (
        <>

            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={<img alt="example" src={data.Image} />}
            >
                <Meta title={data.Subtitle} />

                <Space direction="vertical">
                    <Typography.Text type="secondary">Instructor:- {data.Instructor} </Typography.Text>

                    <Typography.Text type="secondary">Link:- <a href={data.URl}>Course</a> </Typography.Text>

                    {data["Avg Rate_x"] ? (
                        <Rate disabled defaultValue={data["Avg Rate_x"]} />
                    ) : (
                        <Rate disabled defaultValue={data["Avg Rate"]} />
                    )}
                </Space>
            </Card>

        </>
    )
}

export default CourseCard