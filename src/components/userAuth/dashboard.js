import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { auth } from "../../firebase";
import { deleteUser } from "../../features/usersSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './dashboard.css'


export default function Dashboard() {
    const [error,setError]=useState("");
    const data=useSelector((state)=>state.Users.currentUser);
    const dispatch=useDispatch();
    const navigate=useNavigate();
  
  function handleLogout() {
    setError("")

    auth.signOut()
    .then(() => {
      // User successfully logged out
      dispatch(deleteUser());
      console.log('User logged out');
      navigate("/");
      
      // Perform any additional actions after logout
    })
    .catch((error) => {
      // Handle any errors
      console.log('Error logging out:', error);
      setError("Error signing out!!");
    });
  }

  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
      <div className="w-100" style={{maxWidth:'500px'}}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="accDetails">
            {
              (data.email==="guptavaibhav378@gmail.com") ? <div>Welcome Admin!!</div> : <div>Welcome User!!</div>
            }
          <strong>{data.email}</strong> 
          </div>
          <div className="yourInfo">
           <p className="yourInfoHead"> YOUR INFORMATION </p>
           <div className="yourOrdersSec">
            <div className="yourOrderIcon"><ShoppingBagIcon/></div>
            <div className="yourOrders">Your Orders</div>
            <div className="swipeRightIcon"><KeyboardArrowRightIcon/></div>
            </div> 
            <div className="addressBookSec">
              <div className="addressBookIcon"><i className="fa-solid fa-address-book"></i></div>
              <div className="addressBook">Address Book</div>
              <div className="swipeRightIcon"><KeyboardArrowRightIcon/></div> 
              </div>
            <div className="addressBookSec">
              <div className="addressBookIcon"><i className="fa-solid fa-wallet"></i></div>
              <div className="addressBook">Your Wallets</div>
              <div className="swipeRightIcon"><KeyboardArrowRightIcon/></div> 
              </div>
              {
                (data.email==="guptavaibhav378@gmail.com") && 
                <Link to="/adminMain" style={{color:"black",textDecoration:"none"}}>
                <div className="addressBookSec">
              <div className="addressBookIcon"><i className="fa-solid fa-address-book"></i></div>
              <div className="addressBook">Your Products</div>
              <div className="swipeRightIcon"><KeyboardArrowRightIcon/></div>
              </div>
              </Link>
              }
              <div className="addressBookSec" style={{cursor:"pointer"}} onClick={()=>handleLogout()}>
              <div className="addressBookIcon"><i class="fa-solid fa-power-off"></i></div>
              <div className="addressBook">Log Out</div>
              <div className="swipeRightIcon"><KeyboardArrowRightIcon/></div>
              </div>
            
          </div>
          <div className="otherInfo">
           <p className="yourInfoHead"> OTHER INFORMATION </p>

           <div className="yourOrdersSec">
            <div className="otherInfoIcon"><i className="fa-solid fa-circle-info"></i></div>
            <div className="yourOrders">About Us</div>
            <div className="swipeRightIcon"><KeyboardArrowRightIcon/></div>
            </div> 
            <div className="addressBookSec">
              <div className="otherInfoIcon"><i class="fa-solid fa-sheet-plastic"></i></div>
              <div className="addressBook">Terms Of Use</div>
              <div className="swipeRightIcon"><KeyboardArrowRightIcon/></div> 
              </div>
            <div className="addressBookSec">
              <div className="otherInfoIcon"><i class="fa-solid fa-key"></i></div>
              <div className="addressBook">Privacy Policy</div>
              <div className="swipeRightIcon"><KeyboardArrowRightIcon/></div> 
              </div>
          </div>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3" style={{backgroundColor: 'var(--darkGreen)',color: 'var(--white)',outline: "none",border: "0",
    borderRadius: "0.7em"}}>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      {/* <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout} style={{color:'var(--darkGreen)' ,fontWeight:"bold"}} >
          Log Out
        </Button>
      </div> */}
      </div>
      </Container>
    </>
  )
}