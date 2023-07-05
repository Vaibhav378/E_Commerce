import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { sendPasswordResetEmail} from "firebase/auth";
import { Container } from "react-bootstrap";

export default function ForgotPassword() {
  const emailRef = useRef()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setMessage("")
    setError("")

    sendPasswordResetEmail(auth,emailRef.current.value)
    .then(() => {

        setLoading(true)
        // Password reset email sent successfully
        console.log('Password reset email sent to:', emailRef.current.value);
        setMessage("Check your inbox for further instructions")
        setLoading(false)
        // Perform any additional actions after sending the email
      })
      .catch((error) => {
        // Handle any errors
        console.log('Error sending password reset email:', error);
        setError("Failed to reset password")
      });
  }

  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
      <div className="w-100" style={{maxWidth:'400px'}}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4" style={{fontFamily: "Fraunces, serif"}}>Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label style={{fontWeight:"500",fontFamily: "Montserrat, sans-serif"}}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit" style={{backgroundColor: 'var(--darkGreen)',color: 'var(--white)',outline: "none",border: "0",
    borderRadius: "0.7em"}}>
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/" style={{color:'var(--darkGreen)',fontWeight:"bold"}}>Login</Link>
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