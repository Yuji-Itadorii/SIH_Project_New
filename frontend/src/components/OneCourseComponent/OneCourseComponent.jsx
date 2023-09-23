import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GetCourseReviews from "../GetCoursereviews/GetCourseReviews";

function OneCourseComponent() {

    const [course, setCourse] = useState({});
    const { id } = useParams();

    const seeCourse = async () => {
        try {
            const url = "/api/course/courses/" + id
            // console.log(url)
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            //   console.log(res);
            const dataObj = await res.json();
            //   console.log(dataObj.data);
            // console.log(dataObj)
            setCourse(dataObj.data)
            if (res.status === 200) {
                console.log(course)
            } else {
                throw new Error("Course aquisition from db failed");
            }
        } catch (err) {
            window.alert(err);
        }
    };

    useEffect(() => {
        seeCourse();
    }, [])

    return (
        <div>
            <div className="card" >
                <div className="card-body">
                    <h1 className="card-title">{course.title}</h1>
                </div>
                <div className="card-text"> <h4> PRICE:{course.price}</h4></div>
                <div className="card-text"> <h4> Ratings:{course.ratingsAvg}</h4></div>
                <div>
                    <p className="card-text">
                        description: {course._id}
                    </p>
                    <p className="card-text">
                        Domain: {course.domain}
                    </p>
                    <p className="card-text">
                        IMG URL: {course.urlImg}
                    </p>
                </div>
            </div>

            <div>
                <GetCourseReviews id={id} />
            </div>

            <button>
                <Link to={'/review/' + id} > AddReview</Link>
            </button>
        </div>

    );
}

export default OneCourseComponent;