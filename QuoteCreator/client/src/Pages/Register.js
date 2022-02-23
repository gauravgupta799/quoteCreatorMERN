import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

const Register = () => {

    const history = useHistory();

    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8700/api/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            name,email,password,
            }),
            })

        const data = await response.json();
        if(data.status === 'ok'){
           history.push('/login');
        }
        
    }
    

  return (
    <div className="container" style={{marginTop:'5%'}}>
     <h1>Register</h1>
     <form onSubmit ={registerUser}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="name" className="form-control" id="name"  placeholder="Enter name" value={name} onChange = {(e)=>setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange = {(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input type="password" className="form-control" id="Password" placeholder="Password" value={password} onChange = {(e)=>setPassword(e.target.value)}/> 
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
     
    </div>
  )
}

export default Register