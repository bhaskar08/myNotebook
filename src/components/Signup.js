import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' ;

const Signup = (props) => {
    const [credentials,setCredentials]=useState({name:"", email:"",password:""});

    const navigate = useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',              
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
       
          });
          const json=await response.json()
          console.log(json)
          if(json.success)
          {
            //navigate to home page
            localStorage.setItem('token',json.token)
            navigate("/");
            props.setCustomAlert('Account Created Successfully','success')
          }
          else
          {
            props.setCustomAlert('Invalid Credentials','danger')
          }
    }
    const handleChange=(e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <div>
        <form className='' style={{margin:'40px'}} onSubmit={handleSubmit}>
            <h2>Sign UP</h2>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="name" className="form-control" value={credentials.name} onChange={handleChange} name="name"  id="name" aria-describedby="name"/>
            <div id="name" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={handleChange} name="email"  id="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1"  className="form-label">Password</label>
            <input type="password" name="password" onChange={handleChange} className="form-control" value={credentials.password} id="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Signup
