import React from 'react'
import { Link } from 'react-router-dom';


function Landing() {
  return (
    <div>
        <div className="row landing">
            <div className="col-md-12 text-center">
                <h2 style={{color:"white", fontSize:"130px"}}>PRAKASH INN</h2>
                <h1 style={{color:"white"}}>अतिथि देवो भव</h1>
                <Link to='/home'>
                <button className='btn'style={{background:"white",color:"black"}}>Get Started</button>
                </Link>

            </div>

        </div>
    </div>
  )
}

export default Landing