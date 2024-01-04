import React,{useState} from 'react'
import { Form,Button,Alert } from 'react-bootstrap';
import {auth } from '../firebase'
import { Link } from 'react-router-dom';
import { onAuthStateChanged,updateEmail,updatePassword,updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../cssFiles/additionalDetails.css'
function AdditionalDetails() {
    const navigate = useNavigate();
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [conPassword,setConPassword]=useState();
    const [error,setError]=useState();

    async function addDetails(e){
        setError();
        e.preventDefault();
        const user = auth.currentUser;
        console.log(user.displayName);
        if(conPassword===password)
        {
           updateProfile(auth.currentUser,{
            displayName:name,photoURL:""
           }).then(()=> console.log("Name added to the Profile"))
           .catch((e)=>{
            setError(e.msg)
           })
           updateEmail(auth.currentUser,email)
           .then(()=> console.log("Email Updated"))
           .catch((e)=>{
            setError(e.msg)
           })
           updatePassword(auth.currentUser,password)
           .then(()=>console.log("Password Set Successfully"))
           .catch((e)=> setError(e.msg));
           if(!error)
           navigate('/userRoute');
           
        }
        else
        {
            setError('Passwords Do not Match');
        }
    }
    const user = auth.currentUser;
    if(user)
    return (
      <div className=''>
        <div>
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
        </div>
        <Form onSubmit={addDetails} style={{background:"white"}}>
        <p style={{fontSize:"22px"}}>Step 2 of 2</p>
    {error && <Alert key="danger" variant='danger'>{error}</Alert>}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" onChange={(e)=> setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConPassword"  >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Retype Password" onChange={(e)=> setConPassword(e.target.value)}/>
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
</div>
      
      );
      else
      return <h1>Invalid Access</h1>
}

export default AdditionalDetails