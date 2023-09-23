import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCoursesComponent() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [price, setPrice] = useState('');
    const [ratingsAverage, setRatingsAverage] = useState('');
    const [domain, setDomain] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleSubtitleChange = (e) => setSubtitle(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleRatingsAverageChange = (e) => setRatingsAverage(e.target.value);
    const handleDomainChange = (e) => setDomain(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("sdkjgn");
            const res = await fetch('/api/course/crudCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    title,
                    subtitle,
                    price,
                    ratingsAverage,
                    domain,
                }),
            });
            console.log(res);
            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                window.alert(data.message);
                navigate('/all_courses');

            } else {
                window.alert('Some error occurred');
            }
        } catch (e) {
            window.alert('Error occurred: ' + e);
        }
    };

    return (
        <div>
            <h1>Create Plan</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="subtitle">Subtitle:</label>
                    <input
                        type="text"
                        id="subtitle"
                        value={subtitle}
                        onChange={handleSubtitleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={handlePriceChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="ratingsAverage">Ratings Average:</label>
                    <input
                        type="number"
                        id="ratingsAverage"
                        value={ratingsAverage}
                        onChange={handleRatingsAverageChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="domain">Domain:</label>
                    <input
                        type="text"
                        id="domain"
                        value={domain}
                        onChange={handleDomainChange}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddCoursesComponent;