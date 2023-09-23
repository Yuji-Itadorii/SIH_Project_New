import React ,{useState}from 'react'
import './Loginform.css'
function loginsih() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName]=useState('');
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try{
            const res = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name,email, password }),
            })
            const data = await res.json()
            if(res.status === 200){
                window.alert(data.message)
            }else{
                window.alert('Some error occured')
            }
        }catch(e){
            window.alert('Error occured : ' + e)
        }
      };
  return (
    <form>
    
    <title>Login Page</title>
    <div class="card">
        <h2>Login</h2>
        <form  onSubmit={handleSubmit}>
            <div class="form-group">
                <input type="text" name="name" placeholder="Name"  onChange={handleNameChange}/>
            </div>
            <div class="form-group">
                <input type="text" name="email" placeholder="E-mail" onChange={handleEmailChange}/>
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="Password" onChange={handlePasswordChange}/>
            </div>
            <input class="button" type="submit" value="Login"/>
        </form>
    </div>
    </form>
  )
}

export default loginsih
