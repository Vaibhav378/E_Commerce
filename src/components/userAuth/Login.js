import React from 'react';
import {Form,Button,Card,Alert} from 'react-bootstrap';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef,useState} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { setUser } from '../../features/usersSlice';
import { useDispatch } from 'react-redux';
import { Container } from "react-bootstrap";
import "./Login.css"

function Login() {
    const emailRef=useRef();
    const passwordRef=useRef();
    const [error,setError]=useState("");
    const [msg,setMsg]=useState("");
    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();
    const dispatch=useDispatch();

    function handleSubmit(e)
    {
        e.preventDefault();
        signInWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value)
        .then((userCredential)=>{
            setLoading(true);
            setError("");
            console.log("..",userCredential.user)
            dispatch(setUser(userCredential.user));
            setMsg("You have successfully logged in");  
            setLoading(false);
            navigate("/");
            
            
        })
        .catch((error) => {
            // Handle any errors
            console.log('Error signing in:', error);
            setError("Failed to LogIn, Invalid Credentials!!");
            setMsg("");
          });

    }

  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
      <div className="w-100" style={{maxWidth:'400px'}}>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4 login_title" >LogIn/SignIn</h2>
            {msg && <Alert variant="success">{msg}</Alert>}
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
                    <Button disabled={loading} type="submit" className="w-100 text-center mt-3" style={{backgroundColor: 'var(--darkGreen)',color: 'var(--white)',outline: "none",border: "0",
    borderRadius: "0.7em"}}>
                        LogIn
                    </Button>
            </Form>
            <div className="w-100 text-center mt-3">
            <Link to="/forgot-password" style={{color:'var(--darkGreen)',fontWeight:"bold"}}>Forgot Password?</Link>
          </div>
        </Card.Body>
    </Card>
    
    <div className="w-100 text-center mt-2" style={{fontWeight:"500",fontFamily: "Montserrat, sans-serif"}}>
        Need an account? <Link to="/signup" style={{color:'var(--darkGreen)' ,fontWeight:"bold"}}>Sign Up</Link>
    </div>
    </div>
    </Container>
    </>
  )
}

export default Login;