import React from 'react';

const LoginFormNew = () => {
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const res = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (res.status === 200) {
              window.alert(data.message)
            } else {
              window.alert('Some error occured')
            }
          } catch (e) {
            window.alert('Error occured : ' + e)
          }
    }

  return (
    <div className='container'>
      <h1>Login</h1>
      <form className='form-container' method="POST" onSubmit={handleSubmit}>
        <input type="email" name='email' placeholder='Email'/>
        <input type="password" name='password' placeholder='Password'/>
        <button type="submit">Login</button>
        <p>New here? <a href="">Signup</a></p>
      </form>
    </div>
  );
}

export default LoginFormNew;
