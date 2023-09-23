import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'

const UpdateCourses = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [domain, setDomain] = useState('');
    const [price, setPrice] = useState('');
    const [ratingsAvg, setRatingAvg] = useState('');
    const [urlImg, setUrlImg] = useState('');

    // const handleNameChange = (e) => setName(e.target.value);
    // const handlePriceChange = (e) => setPrice(e.target.value);
    // const handleRatingsChange = (e) => setRatings(e.target.value);
    // const handleDiscountChange = (e) => setDiscount(e.target.value);
    // const handleDurationChange = (e) => setDuration(e.target.value);

    let newPlan = {}
    if (title) newPlan.title = title;
    if (domain) newPlan.domain = domain;
    if (price) newPlan.price = price;
    if (ratingsAvg) newPlan.ratingsAvg = ratingsAvg;
    if (urlImg) newPlan.urlImg = urlImg;

    const { id } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/course/crudCourse/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newPlan),
            })
            const dataObj = await res.json();

            if (res.status === 200) {
                window.alert(dataObj.message)
                navigate('/all_courses')
            } else {
                window.alert('Some error occured')
            }

        }
        catch (e) {
            window.alert('Error occured : ' + e)
        }
    };

    useEffect(() => {

    }, [])

    return (
        <div>
            <h1>Update Course </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                </div>

                <div>
                    <label htmlFor="domain">Domain:</label>
                    <input
                        type="text"
                        id="domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}

                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}

                    />
                </div>
                <div>
                    <label htmlFor="ratingsAvg">RatingsAVg:</label>
                    <input
                        type="text"
                        id="ratingsAvg"
                        value={ratingsAvg}
                        onChange={(e) => setRatingAvg(e.target.value)}

                    />
                </div>
                <div>
                    <label htmlFor="urlImg">Image URL: </label>
                    <input
                        type="text"
                        id="urlImg"
                        value={urlImg}
                        onChange={(e) => setUrlImg(e.target.value)}

                    />
                </div>


                <button type="submit">UPDATE</button>
            </form>
        </div>
    )
}


export default UpdateCourses