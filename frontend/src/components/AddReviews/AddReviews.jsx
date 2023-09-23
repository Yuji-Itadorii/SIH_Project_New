import React, { useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";

function AddReviews() {
    const dat = new Date();
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    //     const handleRatingChange = (e) => setRating(e.target.value);
    //   const handleReviewChange = (e) => setReview(e.target.value);
    const { id } = useParams();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/review/crudReview/" + id, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    review, rating, dat
                }),
            })
            const data = await res.json()
            if (res.status === 200) {
                window.alert(data.message)
                navigate('/course/' + id)

            } else {
                window.alert('Some error occured')
            }

        }
        catch (err) {
            window.alert('Error occured : ' + err)
        }
    }




    return (
        <div>
            <h1>Add Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="review">Review:</label>
                    <input
                        type="text"
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="text"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>

                <div>

                    <label htmlFor="date">Date:</label>
                    <input
                        type="text"
                        id="rating"
                        value={dat}

                    />
                </div>

                <button type="submit">ADD REVIEW</button>
            </form>
        </div>
    )
}

export default AddReviews