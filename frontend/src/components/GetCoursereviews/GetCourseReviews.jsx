import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function GetCourseReviews({ id }) {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    const courseReviews = async () => {
        {
            try {
                const res = await fetch(`/api/review/reviews/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                console.log(res)
                const dataobj = await res.json();
                setReviews(dataobj.data)
                console.log(res.status)

                if (res.status === 200) {
                    console.log(dataobj)
                    //   window.alert(dataobj.message);
                } else {
                    throw new Error("Some error occured");
                }
            } catch (err) {
                window.alert("Some error occured : " + err);
            }
        }
    };

    const handleDeleteReview = async (id) => {
        try {
            const res = await fetch("/api/review/crudReview/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (res.status === 200) {
                window.alert('Reeview deleted Seccessfully')
                // navigate('/plans/+id')
            }
            else {
                throw new Error('Review deletion failed')
            }

        } catch (err) {
            window.alert(err)
        }
    }
    useEffect(() => {
        courseReviews();
    }, [])
    return (
        <>

            <h1>Reviews</h1>
            {reviews.map((review, index) => (

                <div key={index} className="card">
                    <h2>{review.user.name}</h2>
                    <img src="{reviews.user.profileImage}" />
                    <h5 className="card-title">{review.review}</h5>
                    <div className="card-body">
                        <p>review:</p><h3>{review.rating}</h3>
                        <p>created at:</p> {review.createdAt}
                    </div>
                    < button>
                    </button>


                    {/* Delete review Button */}
                    <button
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleDeleteReview(review._id)}
                    >
                        Delete Review
                    </button>
                </div>

            ))
            }


        </>
    );
}

export default GetCourseReviews