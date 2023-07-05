import React from 'react'
import {Form,Button,Card,Alert} from 'react-bootstrap';
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Container } from "react-bootstrap";
import { Link,useNavigate } from 'react-router-dom';

// import { signup } from './features/usersSlice';
import { useRef,useState } from 'react';
import "./Signup.css"

export default function Signup() {

    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef= useRef();
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate= useNavigate();

    function handleSubmit(e)
    {
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value)
        {
            return setError("Password do not match");
        }

        createUserWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value)
        .then((userCredential)=>{
            setError("");
            navigate("/Login");
        })
        .catch((error) => {
            // Handle any errors
            console.log('Error creating user:', error);
            setError("Failed to create an account");
          });

          setLoading(false);
    }


  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
      <div className="w-100" style={{maxWidth:'400px'}}>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4 signup_title">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label style={{fontWeight:"500",fontFamily: "Montserrat, sans-serif"}}>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                <Form.Group id="password">
                    <Form.Label style={{fontWeight:"500",fontFamily: "Montserrat, sans-serif"}}>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                <Form.Group id="confirm-pwd">
                    <Form.Label style={{fontWeight:"500",fontFamily: "Montserrat, sans-serif"}}>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100 text-center mt-3" style={{backgroundColor: 'var(--darkGreen)',color: 'var(--white)',outline: "none",border: "0",
    borderRadius: "0.7em"}}>
                        Sign Up
                    </Button>
            </Form>
        </Card.Body>
    </Card>
    
    <div className="w-100 text-center mt-2" style={{fontWeight:"500",fontFamily: "Montserrat, sans-serif"}} >
        Already have an account? <Link to="/Login" style={{color:'var(--darkGreen)',fontWeight:"bold"}}>Log In</Link>
    </div>
    </div>
    </Container>
    </>
  )
}
