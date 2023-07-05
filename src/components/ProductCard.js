import React, { useState,useEffect } from 'react';
import './ProductCard.css'
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
import {useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseItemQuantity, increaseItemQuantity, prodStatus, removeItem } from '../features/productsSlice';
import { Link } from 'react-router-dom';


const ProductCard = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => {
    // console.log("state..",state.allProducts);
    // console.log(state.allCarts);
    return state.allCarts;
  });


  function handleQty(items) {
    let qty;
    let find = data.cart.findIndex((item) => item.id === items.id);
    // const ele = document.getElementById("form1");
    if (find >= 0) {
      qty = data.cart[find].quantity;
      return qty;
    }
    else {
      return 0;
    }

  };

 const decrementHandler = (items) =>{
  let find = data.cart.findIndex((item) => item.id === items.id);
  
  if(find>=0)
  {
    if(data.cart[find].quantity<2){
      dispatch(removeItem(items.id));
      console.log("...............",items.id);
      

    }
    if(data.cart[find].quantity>1)
    {
      dispatch(decreaseItemQuantity(items.id))
    }
    
  }
  
 }

  return (
    <>
    <div className="wrapper">
      <div className='container'>
      <div class="gallery" >

        {/* running a loop for displaying all products */}
        {data.products.map((item, id) => {
          const findProd = data.cart.find((product) => product.id === item.id)
        
          // let find = data.cart.findIndex((items) => items.id === item.id);

          console.log("findProd...............", findProd)

          return <>
            <div className="prod_card " key={id}>
             
              {(typeof (item.image) === typeof ({})) ?
               ( 
                <>
               <Link to={`/product_desc/${id}/${item.id}/${item.title}/${item.category}`}>
                <img className="prod_image" src={URL.createObjectURL(item.image)} alt='...' /></Link>
                </>)
                :
                (<>
                <Link to={`/product_desc/${id}/${item.id}/${item.title}/${item.category}`}>
                <img className="prod_image" src={item?.image} alt='...' />
                </Link>
                </>)

                }
                
              <MDBCardBody>
                <MDBCardTitle className="product_title">{item.title}</MDBCardTitle>
                <MDBCardText className="description">
                  {item.description}
                </MDBCardText>
                <MDBCardText className="price">
                <span class="product_title green_text">₹{item.price}</span>
                <span class="description strike">₹{item.price-100}</span>
                </MDBCardText>
                              {(findProd)
                              //this will not work when there is no clickEvent that is when switching between pages
                              // ((data.status.findIndex((items) => items.id ===item.id))>=0)
                              ?
 
                  <div
                    className="d-flex mb-4 update_btns"
                  >
                    <button
                      className="incdec_btn"
                      onClick={()=>decrementHandler(item)}
                    >
                      <i className="fas fa-minus"></i>
                    </button>

                    <div className="prod_qty">
                      {handleQty(item)}
                    </div>

                    <button
                      className="incdec_btn"
                      onClick={(e) => {
                        dispatch(increaseItemQuantity(item.id));
                        // dispatch(prodStatus(item));
                      }

                      }
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  :
                  <button onClick={(e) => {
                    dispatch(addToCart(item));
                    // dispatch(prodStatus(item));     
                  }
                  } className="add-btn"><img src="https://bit.ly/3Q6Adni" alt="" class="add-btn_img"/>
                  <span class="description add-btn_text">Add to Cart</span></button>
                }
              

              </MDBCardBody>
            </div>
          </>
        })
        }
        </div>

      </div>
    </div>
    </>
  );
}

export default ProductCard;