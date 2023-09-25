import React from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { addToProducts } from '../features/productsSlice';
import { useDispatch } from 'react-redux';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import "./admin.css";

const Admin = () => {
  const [image, setImage] = useState("");
  const [prod, setProd] = useState({ id: "", title: "", price: "", category: "", description: "", image: {}, quantity: "" });
  const dispatch = useDispatch();

  //for dialog box
  const [dialog, setDialog] = useState(false);

  const openDialog = () => {
    setDialog(true);
  }
  const closeDialog = () => {
    setDialog(false);
  }
  const divStyle = {
    display: "flex",
    felxDirection: "row",
    position: "absolute",
    right: "0px",
    bottom: "0px",
    // padding: "1rem",
  };

  const handleProduct = (e) => {
    console.log("event",e);

    let ID = Math.random();
    console.log("Random id:", ID);
    setProd({ ...prod, ["id"]: ID });
    console.log("id", prod["id"]);
    dispatch((addToProducts(prod)));
    setProd({ id: "", title: "", price: "", category: "", description: "", image: {}, quantity: "" });
    setImage("");
    setDialog(false);
  };

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    //e.target.value will not get the value of "value" attribute of input tag...instead it is the properties of the eventHandler(OnChange)
    //while name is same as the "name" attribute of the input tag 
    name = e.target.name;
    value = e.target.value;
    setProd({ ...prod, [name]: value });

  }
  const twoCalls = (e) => {
    handleImageChange(e);
    handleImageInputs(e);
  };

  const handleImageInputs = (e) => {

    //  alert
    setProd({ ...prod, ["image"]: e.target.files[0] });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  }
  return (
    <>
      <div className="admin_container">
        <div className="admin_product_title "><div>Admin Page</div></div>
        <div className="details">
          <Container style={{paddingTop:"0.5em",paddingBottom:"0"}}>
            <Row style={{marginLeft:"-4em"}}>
              <Col sm={8}>
                <Form>
                  <Form.Group as={Row} className="mb-3" controlId="formtitle">
                    <Form.Label column sm="3" className="admin_lbl">
                      Prod_Title
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control type="text"
                        name="title"
                        value={prod.title}
                        onChange={handleInputs}
                        placeholder="product_title" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formprice">
                    <Form.Label column sm="3" className="admin_lbl">
                      Prod_Price
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control type="number"
                        name="price"
                        value={prod.price}
                        onChange={handleInputs}
                        placeholder="product_price" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formqty">
                    <Form.Label column sm="3" className="admin_lbl" >
                      Prod_Qty
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control type="number"
                        name="quantity"
                        value={prod.quantity}
                        onChange={handleInputs}
                        placeholder="product_quantity" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formcategory">
                    <Form.Label column sm="3" className="admin_lbl">
                      Prod_Catg
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control type="text"
                        name="category"
                        value={prod.category}
                        onChange={handleInputs}
                        placeholder="product_category" />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3 " as={Row}>
                    <Form.Label column sm="3" className="admin_lbl">Product_Desc</Form.Label>
                    <Col sm="10">
                    <Form.Control as="textarea" rows={3}
                      name="description"
                      value={prod.description}
                      onChange={handleInputs}
                      />
                      </Col>
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={4}>
                <div className="imgContainer">
                <div className="admin_lbl">Product Image</div>
                <div >
                  <label htmlFor='uploadimage'> {image ? <img id="img" src={URL.createObjectURL(image)} style={{ maxWidth: "350px", maxHeight: "350px" }} alt="" /> : <img id="img" src="https://www.certificate.digital/images/theme/resize/cropping.webp" style={{ maxWidth: "350px", maxHeight: "350px" }} alt="" />}</label>
                  <input
                    type="file"
                    id="uploadimage"
                    value=''
                    name="image"
                    onChange={(e) => twoCalls(e)}
                    style={{ display: "none" }} />
                </div>
                </div>

              </Col>
            </Row>
          </Container>

        </div>

      <div className="admin_btn">
        <button type="submit" className="admin_add" onClick={openDialog}>
          Add Product
        </button>
        </div>
        <Dialog onClose={closeDialog} open={dialog}>
          <DialogTitle> Confirm Product</DialogTitle>
          <h3 style={{ marginTop: "-10px", padding: "5px 10px" }}>
            Are you sure to add the Product? {" "}
          </h3>
          <br/>
          <div style={divStyle}>
            <Button type="submit" style={{ backgroundColor: "#dde3ed", color: "black" }} onClick={handleProduct}>
              Confirm
            </Button>
            <Button type="submit" style={{ backgroundColor: "#dde3ed", color: "black" }} onClick={closeDialog}>
              Cancel
            </Button>

          </div>
        </Dialog>

        {/* (e)=>dispatch((addToProducts(prod))) */}
      </div>
    </>
  )
}

export default Admin;