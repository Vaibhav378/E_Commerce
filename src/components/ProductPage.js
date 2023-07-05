import React ,{useState} from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { editProduct } from '../features/productsSlice';
import { useParams } from "react-router-dom";

const ProductPage = () => {

  const {title,id,index} = useParams();
  console.log(title);
  console.log(id);
  console.log(index);

  const data = useSelector((state) => state.allCarts.products[index]);
  console.log(data);
  const [image, setImage] = useState(data.image);
  console.log(image);
  const [prod, setProd] = useState(data);
  console.log(prod);
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

  const handleProduct=(e) =>{
    dispatch(editProduct(prod));
    setProd({ id: "", title: "", price: "", category: "", description: "", image: {}, quantity: "" });
    setImage("");
    setDialog(false);

  }

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
          <div className="container">
          <div className='head' style={{padding:"10px"}}><h2  style={{color:"blue",textAlign:"center"}}>Edit Product Details</h2></div>
        <div className="details">
          <Container>
            <Row>
              <Col sm={8}>
                <Form>
                  <Form.Group as={Row} className="mb-3" controlId="formtitle">
                    <Form.Label column sm="2">
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
                    <Form.Label column sm="2">
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
                    <Form.Label column sm="2">
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
                    <Form.Label column sm="2">
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
                  <Form.Group className="mb-3 ">
                    <Form.Label style={{ textAlign: "left" }}>Product_Desc</Form.Label>
                    <Form.Control as="textarea" rows={3}
                      name="description"
                      value={prod.description}
                      onChange={handleInputs}
                      style={{ marginLeft: "24px" }} />
                  </Form.Group>

                </Form>
              </Col>
              <Col sm={4}>
                <div><h6>Product Image</h6></div>
                <div >
                  <label htmlFor='uploadimage'>
                     {(typeof (image) === typeof ({})) ? <img id="img" src={URL.createObjectURL(image)} style={{ maxWidth: "350px", maxHeight: "350px" }} alt="" />
                      : 
                      <img id="img" src={image} style={{ maxWidth: "350px", maxHeight: "350px" }} alt="" />}</label>
                  <input
                    type="file"
                    id="uploadimage"
                    value=''
                    name="image"
                    onChange={(e) => twoCalls(e)}
                    style={{ display: "none" }} />
                </div>

              </Col>
            </Row>
          </Container>

        </div>

        <Button type="submit" style={{ backgroundColor: "#dde3ed", color: "black" }} onClick={openDialog}>
          Add Product
        </Button>
        <Dialog onClose={closeDialog} open={dialog}>
          <DialogTitle> Confirm Product</DialogTitle>
          <h3 style={{ marginTop: "-10px", padding: "5px 10px" }}>
            Are you sure to add the Product? {" "}
          </h3>
          <br></br>
          <div style={divStyle}>
            <Button type="submit" style={{ backgroundColor: "#dde3ed", color: "black" }} onClick={handleProduct}>
              Confirm
            </Button>
            <Button type="submit" style={{ backgroundColor: "#dde3ed", color: "black" }} onClick={closeDialog}>
              Cancel
            </Button>

          </div>
        </Dialog>

      </div>

    

    </>
  )
}

export default ProductPage;
