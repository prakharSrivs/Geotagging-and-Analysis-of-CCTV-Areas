import React from 'react'
import { Button } from 'react-bootstrap'
import {auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
function PortalNavBar() {
  const navigate=useNavigate();
  const user =auth.currentUser;
  function handleLogOut(){
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
     console.log('Unable to Sign out user \n ',error.msg)
    });
  }
  if(user)
  return (
    <div className='NavBar'  style={{paddingLeft:"30px",paddingRight:"30px",backgroundColor:"#1A17E4", display:"flex",justifyContent:"space-between",alignItems:"center",color:"white",fontFamily:"Montserrat",height:"80px"}}>
        <div className="toggleIcon" style={{}}>Home</div>
        <div className="userInfo" style={{display:"flex",alignItems:"center"}}>
            <div className="userName" style={{paddingRight:"20px"}}>
                Hi {user.displayName}
            </div>
            <Button style={{borderRadius:"35px",background: "rgba(217, 217, 217, 0.2)"}} onClick={handleLogOut}>Log Out</Button>
        </div>
    </div>
  )
}

export default PortalNavBar