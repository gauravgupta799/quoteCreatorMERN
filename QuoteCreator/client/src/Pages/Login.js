import React,{useState} from 'react'

const Login = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const LoginUser = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8700/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email, password,
            }),
        })
        const data = await response.json();

        if(data.user){
            localStorage.setItem('token',data.user);
            alert('Login Successfully !');
            window.location.href = '/dashboard';
        }else{
            alert('Login Failed !, Please Correct credentials.')
        }
        // console.log(data.user);
    }
    

  return (
    <div className="container" style={{marginTop:'5%'}}>
     <h1>Login</h1>
     <form onSubmit ={LoginUser}>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input type="email"
            className="form-control" 
            id="Email1" aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange = {(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input type="password"
           className="form-control" id="Password"
           placeholder="Password"
           value={password} 
           onChange = {(e)=>setPassword(e.target.value)}/> 
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
     
    </div>
  )
}

export default Login;