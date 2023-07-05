import React from 'react';
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const style={
    color:"#69a4b3",fontSize:"13px",marginLeft:"10px",padding:"0px",marginTop:"-10px"
  }
  const {cart,totalPrice}=useSelector((state)=> state.allCarts);
  return (
    <div className="checkout">
        <Container>
      <Row>
        <Col sm={8}>
            <div className="shipping">
              <h2>SHIPPING ADDRESS</h2>
              <hr/>
              <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
        <Form.Label>Street Address</Form.Label>
        <Form.Control type="text" placeholder="Stree Adress" />
        
        <Form.Label>Apartment/Suite</Form.Label>
        <Form.Control type="text" placeholder="Apartment/Suite" />
        
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder="City" />
        
        <Form.Label>Phone</Form.Label>
        <Form.Control type="number" placeholder="Phone" />
        
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group> */}
      <Button type="submit" style={{backgroundColor:"#dde3ed",color:"black"}}>
        Continue To Delievery
      </Button>
    </Form>
              
            </div>
        </Col>
        <Col sm={4}>
          <div className="summary pt-5" style={{backgroundColor:"#dde3ed"}} >
            <div className="head" style={{textAlign:"center",fontWeight:"bold"}}>Order Summary</div>
            <hr/>
            <div className="details">
            <Container>
            {cart.map((data,index)=>(
            <Row className="mb-3 justify-conten-between">
              <Col xs={6} md={4}>
            <div className="title">
              <span style={{color:"darkgreen"}}>Title {index+1}:</span>
              <strong>{data.title}</strong></div>
              </Col>
              <Col sm>
               <div className="price">
                <strong>{(data.price)*(data.quantity)}</strong>
               </div>
              </Col>
              </Row>
          ))}
          </Container>
          <hr/>
          <Container>
            <Row className="mb-3 justify-conten-between">
              <Col xs={6} md={4}>Total</Col>
              <Col sm>{totalPrice}</Col>
            </Row>
          </Container>
          <div className="promo text-start mt-0">
          <p style={style}>Apply Promo Code 
              <i className="fa fa-arrow-right" aria-hidden="true" style={{marginLeft:"3px"}}></i>
              </p>
          
          </div>
              
           </div>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}


export default Checkout;