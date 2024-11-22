import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import Loading from '../Component/Loader';
import Error from '../Component/Error';
import Success from '../Component/Success';
function Register() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  async function register(){
    if(password===confirmPassword){
      const user={
        name,email,password,confirmPassword
      }
      try{
        setLoading(true);
        const result=await axios.post('http://localhost:5000/api/user/register',user)
        setLoading(false)
        setSuccess(true);



        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }catch(error){
        console.log(error);
        setLoading(false);
        setError(true);
      }

    }
    else{
      alert('Password Does Not Match');
    }
  }
  return (
    <div>

      {(loading) && (<Loading/>)}
      {(error) && (<Error/>)}
      <div className="row justify-content-center mt-5">

        <div className="col-md-6 bs mt-5" style={{padding:'15px'}}>
        {(success) && (<Success message="Registration Successfull"/>)}

          <h2>Register</h2>
          <input type="text" placeholder='Name' className='form-control'value={name} onChange={(e)=>{setName(e.target.value)}}/>

          <input type="text" placeholder='E-mail' className='form-control' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="text" placeholder='Password' className='form-control' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <input type="text" placeholder='Confirm Password' className='form-control' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
          <button className="btn btn-primary mt-3" onClick={register}>Register</button>
        </div>

      </div>
        
    </div>
  )
}

export default Register