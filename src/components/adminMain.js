import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from '../features/productsSlice';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import './adminMain.css';
import { Link } from 'react-router-dom';


function AdminMain() {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.allCarts);

    return (
        <>
            <div className="main_wrapper">
                <div className='main_container'>
                    <div className="main_product_title main_head" style={{ textAlign: "center" }}><h1>Admin-Main Page</h1></div>
                    <div className="main_gallery">

                        {/* running a loop for displaying all products */}
                        {data?.products.map((item, index) => (
                            <div className="main_prod_card " key={index}>

                                {(typeof (item.image) === typeof ({})) ?
                                    <img className="main_prod_image" src={URL.createObjectURL(item.image)} fluid alt='...' />
                                    :
                                    <img className="main_prod_image" src={item?.image} fluid alt='...' />}
                                <MDBCardBody>
                                    <MDBCardTitle className="main_product_title">{item.title}</MDBCardTitle>
                                    <MDBCardText className="main_description">
                                        {item.description}
                                    </MDBCardText>
                                    <MDBCardText className="main_price">
                                        <span class="main_product_title green_text"> ₹{item.price}</span>
                                    </MDBCardText>

                                    <div className="btns">
                                        <div className="btn_update">
                                            <Link to={`/adminMain/${item.title}/${item.id}/${index}`} >
                                                <button className="updatebtn" onClick={(e) => {

                                                }
                                                }>Edit</button></Link></div>

                                        <div className="btn_update">
                                            <button className="updatebtn" onClick={(e) => {
                                                dispatch(deleteProduct(item));
                                            }
                                            }>Delete</button></div>

                                        </div>
                                </MDBCardBody>
                            </div>

                        ))
                        }

                    </div>
                    <div className="cart">
                        <Link to="/admin" className="link_add_new">
                            <button className="add_new_btn">Add New Product</button></Link>
                    </div>
                    
                </div>
                
            </div>
        </>
    );
}

export default AdminMain;