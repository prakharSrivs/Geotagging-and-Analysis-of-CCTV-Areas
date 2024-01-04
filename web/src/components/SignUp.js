import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React,{useState} from 'react'
import {auth} from '../firebase'
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function PhoneAuth() {

    const navigate = useNavigate();
    const generateRecaptcha = function(){
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-verifier', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
                   
            }
          }, auth);
    }
    const setPhoneState = function(e){
        setPhoneNumber(e.target.value);
    }
    const setOTPState= function(e){
        setOTP(e.target.value);
    }
    const countryCode="+91";
    const [phoneNumber,setPhoneNumber]=useState(countryCode);
    const [expandForm,setExpandForm]=useState(false);
    const [otp,setOTP]=useState();
    const [error,setError]=useState();
    const [buttonInfo,setButtonInfo]=useState("Send OTP");
    function requestOTP(e){
      e.preventDefault();
      if(phoneNumber.length==13)
      {
        setError('')
        setButtonInfo("Validate OTP");
        setExpandForm(true);
        generateRecaptcha();
        console.log("success1");
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("success3");

        }).catch((error) => {
         setError(error.msg);
        });
      }
      else{
        setError("Invalid Phone Number");
      }
    }
    function verifyOTP(e){
        e.preventDefault();
        if(otp && otp.length===6)
        {
            let conResult = window.confirmationResult;
            conResult.confirm(otp).then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log("Successfully Registered");
                navigate('/additionalDetails');
                // ...
              }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                setError(error.msg);
                // ...
              });
        }
        else
        {
          setError("Wrong OTP");
        } 
    }
  return (
    <div >
    <Form style={{fontFamily:"Montserrat" }} onSubmit={expandForm ? verifyOTP:requestOTP}>
    <p style={{fontSize:"22px"}}>Step 1 of 2</p>
    {error && <Alert key="danger" variant='danger'>{error}</Alert>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="tel" placeholder={countryCode} onChange={setPhoneState}/>
        <Form.Text className="text-muted">
          We'll never share your Phone Number with anyone else.
        </Form.Text>
      </Form.Group>

      {expandForm && <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>  OTP</Form.Label>
        <Form.Control type="password" placeholder="Enter 6 digit OTP" onChange={setOTPState} />
      </Form.Group>}
      <Button variant="primary" size='sm' type="submit" style={{fontSize:"18px",fontWeight:"500",background:"#1A17E4",marginTop:"10px"}}>
        {buttonInfo}
      </Button>
    </Form>
    <div className="recaptcha-verifier" id="recaptcha-verifier"></div>
    </div>
  );
}

export default PhoneAuth;