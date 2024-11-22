import React from 'react'
import { useState } from 'react'
import Loading from '../Component/Loader';
import Error from '../Component/Error';
import axios from 'axios';

function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(false);

  async function Login(){
    
      const user={
        email,password
      }
      try{
        setLoading(true);
        const result=await axios.post('http://localhost:5000/api/user/login',user)
        setLoading(false);
        localStorage.setItem('currentUser',JSON.stringify(result))
        window.location.href='/home';
        

      }catch(error){
        console.log(error);
        setLoading(false)
        setError(true);
      }
  }
  return (
    <div>
 {(loading) && (<Loading/>)}

      <div className="row justify-content-center mt-5">
        <div className="col-md-6 bs mt-5" style={{padding:'15px'}}>
        {(error) && (<Error message='Invalid Credentials'/>)}
          <h2>Login</h2>

          <input type="text" placeholder='E-mail' className='form-control' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="text" placeholder='Password' className='form-control' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <button className="btn btn-primary mt-3" onClick={Login}>Login</button>
        </div>

      </div>
        
    </div>
  )
}

export default Login