import React from 'react'
import PhoneAuth from './SignUp'
import { AuthProvider } from "../Context/AuthContext";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../cssFiles/Register.css'
import '../cssFiles/NavBar.css'
function Register() {
  //
  return (
    <div className='mainContainer'>
     <div className='navBar'  >
     <Link to="/"><div className="brandImage"></div></Link>
            <div className="navLinks">
                <div className="nLink" 
                style={{fontFamily:"Montserrat",fontSize:17, color:"grey"}}>
                Already Registered ? Log In
                </div>
                <Button size='lg' style={{backgroundColor:"#1A17E4"}}><Link to='/login' style={{textDecoration:"none",color:"white"}}>Log In</Link></Button>
            </div>
        </div>
    <div className="signUpForm" style={{background:"white",padding:"40px"}}>
    <AuthProvider>
    <PhoneAuth/>
    </AuthProvider>
    </div>
    </div>
  )
}

export default Register