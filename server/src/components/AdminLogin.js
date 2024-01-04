import React,{useRef,useState} from 'react'
import { Container,Card,Alert,Form } from 'react-bootstrap'
import {Button} from 'react-bootstrap';
import '../cssFiles/AdminLogin.css'
function AdminLogin() {
  const [currentUser,setCurrentUser]=useState();
  const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    

  return (
    <div className='LoginContainer'>
    <div className="sideImage">
      <div className="SideBrandImage" >
      </div>
    </div>
    <div>
      <Container className='d-flex  justify-content-center ' style={{minHeight:'100vh',marginTop:"1%"}}>
  <div>
    <Card style={{background:"white", padding:"25px",borderRadius:"4%" , marginTop:"100px"}}>
        <Card.Body>
         <h2 className="text-center m b-4">Register</h2>  
         {currentUser && currentUser.email} 
         {error && <Alert variant="danger">{error}</Alert>}
         <Form >
            <Form.Group id="email" style={{paddingBottom:"20px"}}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" style={{paddingBottom:"20px"}}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button className="w-100 text-center mt-2" type='submit' disabled={loading}>Admin Login</Button>
         </Form>
        </Card.Body>
    </Card>
    </div>
    </Container>  
    </div>
    </div>
  )
}

export default AdminLogin