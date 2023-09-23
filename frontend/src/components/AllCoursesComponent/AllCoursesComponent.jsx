import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AllCoursesComponent() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])

    const allCourses = async () => {
        {
            try {
                const res = await fetch("/api/course/allcourses", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const dataobj = await res.json();
                setCourses(dataobj.data)
                if (res.status === 200) {
                    // console.log(dataobj)
                    //   window.alert(dataobj.message);
                } else {
                    throw new Error("Some error occured");
                }
            } catch (err) {
                window.alert("Some error occured : " + err);
            }
        }
    };



    const handleDeleteCourse = async (id) => {
        try {
            const res = await fetch("/api/course/crudCourse/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (res.status === 200) {
                window.alert('Plan deleted Seccessfully')
                navigate('/all_courses')
            }
            else {
                throw new Error('PLan deletion failed')
            }

        } catch (err) {
            window.alert(err)
        }
    }






    useEffect(() => {
        allCourses();
    }, [])

    return (
        <>
            <h1>All Courses</h1>
            {
                courses && courses.map((course, index) => (

                    <div key={index} className="card">
                        <h5 className="card-title">{course.title}</h5>
                        <div className="card-body">
                            <h3>{course.domain}</h3>
                            <h2 className="card-text">PRICE: {course.price}</h2>

                            {/* Delete User Button */}
                            <button
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleDeleteCourse(course._id)}
                            >
                                Delete Course
                            </button>

                            {/* Update User Button */}
                            <button
                                style={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                }}
                            >  <Link
                                to={'/updatecourses/' + course._id}
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                }}
                            >
                                    Updateplan
                                </Link>
                            </button>


                            <Link
                                to={'/course/' + course._id}
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                }}
                            >
                                See Course
                            </Link>



                        </div>


                    </div>
                ))

            }
        </>
    );
}

export default AllCoursesComponent;