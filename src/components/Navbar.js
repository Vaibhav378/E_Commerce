import React, { useEffect } from 'react';
// import {
//   MDBContainer,
//   MDBNavbar,
//   MDBNavbarBrand,
//   MDBBtn
// } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getCartTotal } from '../features/productsSlice';
import "./Navbar.css";



export default function Navbar() {
  //note that cart must be imported fist to use useEffect on it
  const { cart, totalQuantity } = useSelector((state) => state.allCarts);

  const currUser = useSelector((state) => state.Users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <>
      <div className="nav">
        <div className="nav-container">
          <Link to="/">
          <h1 style={{ marginLeft: "0.25em",fontFamily:"cursive",fontWeight:"bold"}}>Trends</h1>
          </Link>
          <ul className="links">
            <Link to="/products">
              <li>Category</li>
            </Link>

            <Link to="/products">
              <li>Lifestyle</li>
            </Link>

            <Link to="/products">
              <li>Products</li>
            </Link>
          </ul>

          <div className="navbar_search">
            <Form className="d-flex">
              <i className="fas fa-search" style={{ marginTop: "0.6em", marginRight: "0.2em" }}></i>
              <Form.Control
                type="search"
                placeholder="Search for products,brands and more"
                className="me-3 "
                aria-label="Search" style={{ border: "collapse" }}
              />
            </Form>

          </div>

          <div className="nav_info">
           {currUser.authenticated ?
           <Link to="/dashboard">
           <div className="profile">
             <i className="fa fa-user info_img" aria-hidden="true"></i>
             <div className="info_text">Profile</div>
           </div>
         </Link>
         :
         <Link to="/login">
              <div className="profile">
                <i className="fa fa-user info_img" aria-hidden="true"></i>
                <div className="info_text">Profile</div>
              </div>
            </Link>



           }
            
            <Link to="/cart">
              <div className="wishlist">
                <img width="16" height="16" className="info_img" src="https://img.icons8.com/material-outlined/24/like--v1.png" alt="like--v1" />
                <div className="info_text">Wishlist</div>
              </div>
            </Link>
            <Link to="/cart">
              <div className="bag">
                <img width="16" height="16" className="bag_img info_img" src="https://img.icons8.com/small/16/bag-front-view.png" alt="bag-front-view" />
                <div className="info_text">Bag</div>
              </div>
            </Link>
            <div className="amount-container">
              <p className="total-qty">{totalQuantity}</p>
            </div>
          </div>

        </div>
      </div>


      {/*    <MDBNavbar light bgColor='light'>
       <MDBContainer fluid>
           {(currUser.authenticated && currUser.currentUser.email==="guptavaibhav378@gmail.com") && ( */}
      {/* //           <>
  //           <MDBNavbarBrand><span>
  //           <Link to="/admin">Admin</Link></span></MDBNavbarBrand>
  //       <MDBNavbarBrand><span>
  //         <Link to="/adminMain">Admin-Main</Link></span></MDBNavbarBrand>
  //           </>
  //         )} 
  //       <span>
  //         <Link to="/products">All Products</Link></span>
        
  //         {currUser.authenticated ?<span><Link to="/"><i class="fa-solid fa-user" style={{maxHeight:"50px",maxWidth:"px"}}/></Link></span> 
  //         : */}
      {/* //         <MDBNavbarBrand>
  //         <span>
  //         <Link to="/">
  //           Login/SignUp</Link></span>
  //           </MDBNavbarBrand>      
  // }
  // <MDBBtn color="dark">
  //         <Link to="/cart"> Cart({totalQuantity})</Link>
  //         </MDBBtn>
  //        </MDBContainer>
  //   </MDBNavbar> */}

    </>

  );
}