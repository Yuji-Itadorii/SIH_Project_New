import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [interests, setInterests] = useState('');
  const [education, setEducation] = useState('');
  const [institution, setInstitution] = useState('');
  const navigate = useNavigate();

  const handleFnameChange = (e) => setFname(e.target.value);
  const handleLnameChange = (e) => setLname(e.target.value);
  const handleContactChange = (e) => setContact(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);
  const handleInterestsChange = (e) => setInterests(e.target.value);
  const handleEducationChange = (e) => setEducation(e.target.value);
  const handleInstitutionChange = (e) => setInstitution(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          fname,
          lname,
          contact,
          password,
          role,
          interests,
          education,
          institution,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        window.alert(data.message);
        navigate('/profile');
      } else {
        window.alert('Some error occurred');
      }
    } catch (e) {
      window.alert('Error occurred: ' + e);
    }
  };

  return (
    <div className='signup-form-div'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            value={fname}
            onChange={handleFnameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            value={lname}
            onChange={handleLnameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={handleContactChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={handleRoleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="interests">Interests:</label>
          <input
            type="text"
            id="interests"
            value={interests}
            onChange={handleInterestsChange}
          />
        </div>
        <div>
          <label htmlFor="education">Education:</label>
          <input
            type="text"
            id="education"
            value={education}
            onChange={handleEducationChange}
            required
          />
        </div>
        <div>
          <label htmlFor="institution">Institution:</label>
          <input
            type="text"
            id="institution"
            value={institution}
            onChange={handleInstitutionChange}
            required
          />
        </div>
        <button type="submit">SIGNIN</button>
      </form>
    </div>
  );
};

export default SigninForm;
