import React, { useState } from 'react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        contact: '',
        email: '',
        password: '',
        role: 'student', // Assuming 'student' is the default role
        interests: '',
        education: 'school', // Assuming 'school' is the default education
        institution: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
    };

    // ...

return (
    // <form onSubmit={handleSubmit}>
        <form >

        <label htmlFor="fname">First Name:</label>
        <input type="text" id="fname" name="fname" value={formData.fname} onChange={handleChange} required /><br />

        <label htmlFor="lname">Last Name:</label>
        <input type="text" id="lname" name="lname" value={formData.lname} onChange={handleChange} required /><br />

        <label htmlFor="contact">Contact:</label>
        <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br />

        <label htmlFor="role">Role:</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange} required>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
        </select><br />

        <label htmlFor="interests">Interests:</label>
        <input type="text" id="interests" name="interests" value={formData.interests} onChange={handleChange} /><br />

        <label htmlFor="education">Education:</label>
        <select id="education" name="education" value={formData.education} onChange={handleChange} required>
            <option value="school">School</option>
            <option value="college">College</option>
            <option value="working">Working</option>
        </select><br />

        <label htmlFor="institution">Institution:</label>
        <input type="text" id="institution" name="institution" value={formData.institution} onChange={handleChange} required /><br />

        <input type="submit" value="Submit" />
    </form>
);

};

export default SignupForm;
