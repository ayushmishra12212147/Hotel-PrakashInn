/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function Navbar() {
    function logout(){
        localStorage.removeItem('currentUser');
    }
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/home">Prakash INN</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa-solid fa-bars" style={{color:'white'}}></i>              
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-5">
                        {user ? (<>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className='fa fa-user'></i>{user.data.name}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="/Profile">Profile</a>
                                    <a class="dropdown-item" href="/login" onClick={logout}>Logout</a>
                                </div>
                            </div>

                        </>) : (<>
                            <li className="nav-item active">

                                <a className="nav-link" href="/register">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </>
                        )}


                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar