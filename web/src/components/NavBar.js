import React from 'react'
import '../cssFiles/NavBar.css'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
function NavBar() {
  return (
    <div>
         <div className='navBar'>
         <Link to="/"><div className="brandImage"></div></Link>
            
            <div className="navLinks">
                <div className="nLink" 
                style={{fontFamily:"Montserrat",fontSize:22}}>
                    <Link to='/adminLogin' style={{textDecoration:"none",color:"black"}}>Admin</Link>
                </div>
                <Button size='lg' style={{backgroundColor:"#1A17E4"}}><Link to='/login' style={{textDecoration:"none",color:"white"}}>Log In</Link></Button>
            </div>
        </div>
    </div>
  )
}

export default NavBar