import React from 'react'
import '../cssFiles/Home.css'
import Button from 'react-bootstrap/Button'
import { useNavigate,Link } from 'react-router-dom'
import Navbar from './NavBar'
function Home() {
    const navigate=useNavigate();
  return (
    <>
        <Navbar/>
        <div className="ctaHeading">
        <div className="ctaBox">
            <div className="cta">
                Help us to serve you better
            </div>
            <div className="subCTA">
                Add you Private,Business or Community CCTV camera location
            </div>
            <div className="ctaButton">
                <Button size='lg' style={{backgroundColor:"#1A17E4"}}><Link to='/signup' style={{textDecoration:"none",color:"white"}}>Register</Link></Button>
            </div>
        </div>
        </div>
    </>
  )
}

export default Home