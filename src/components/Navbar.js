import React from 'react'
import { Link , useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom' 

const Navbar = (props) => {
    const navigate = useNavigate();
    const logoutHandle=()=>{
        localStorage.removeItem('token');
        navigate('/login')
        props.setCustomAlert('Logged Out Successfully','success');
    }
    let location=useLocation()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">myNote</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                        </li>
                      
                    </ul>
                </div>
                {!localStorage.getItem('token')? <form className="d-flex">
            <Link className="btn btn-primary mx-2" role="button" aria-disabled="true" to="/login">Login</Link>
            <Link className="btn btn-primary" role="button" aria-disabled="true" to="/signup">Sign UP</Link></form>:
            <button className='btn btn-primary' onClick={logoutHandle} >Log Out</button>}
            </div>
        </nav>
    )
}

export default Navbar
