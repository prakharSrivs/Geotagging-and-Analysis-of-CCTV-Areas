import React from 'react'
import { Form,Button,Alert } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
function Login() {
    const navigate=useNavigate();
    const[email,setEmail]=React.useState();
    const [password,setPassword]=React.useState();
    const [error,setError]=React.useState();
    function handleSubmit(e){
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/userRoute');
       })
       .catch((error) => {
       setError(error.msg);
        });

    }
  return (
    <div>
    <div className='mainContainer'>
    <div className='navBar'  >
    <Link to="/"><div className="brandImage"></div></Link>
            <div className="navLinks">
                <div className="nLink" 
                style={{fontFamily:"Montserrat",fontSize:17, color:"grey"}}>
                Not Registered ? SignUp
                </div>
                <Button size='lg' style={{backgroundColor:"#1A17E4"}}><Link to='/signUp' style={{textDecoration:"none",color:"white"}}>Sign Up</Link></Button>
            </div>
        </div>
    <div className="signInForm" style={{background:"white",padding:"40px",borderRadius:"5%", width:"500px",margin:"auto",marginTop:"40px"}}>
    <Form onSubmit={handleSubmit}>
    {error && <Alert key="danger" variant='danger'>{error}</Alert>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={(e)=> setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" style={{background:"#3F3CE8"}} type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
    </div>
  )
}

export default Login