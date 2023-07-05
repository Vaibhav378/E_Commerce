import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart,decreaseItemQuantity, increaseItemQuantity,removeItem } from "../../features/productsSlice";
import './Prod_desc.css'

function Prod_desc() {
    
    const dispatch=useDispatch();
    const {index,id,title,category}=useParams();
    console.log("index",index);
    const data=useSelector((state)=>state.allCarts);
    const prod=useSelector((state)=>state.allCarts.products[index]);
    console.log("...product_desc",prod);
    
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

  return (
    <>
    {prod &&
    <section class="container">
        <div class="card-box">
            <div class="desc_img">
                <img src={prod.image} alt="img-desktop" class="desktop_img"/>
                <img src="./images/mug-mobile.jpg" alt="img-mobile" class="mobile_img"/>
            </div>
            <div class="card_text">
                <p class="product">{prod.category}</p>
                <h2 class="product_title">{prod.title}</h2>
                <p class="prod_description">{prod.description}</p>
                <p class="price">
                    <span class="product_title green_text">₹{prod.price}</span>
                    <span class="description strike">₹{prod.price-100}</span>
                </p>
             {
                (data.cart.find((product)=>product.id=== id)) ?
              <div className="desc_update">  
                <button
                      className="incdec_btn"
                      onClick={()=>decrementHandler(prod)}
                    >
                      <i className="fas fa-minus"></i>
                    </button>

                    <div className="prod_qty">
                      {handleQty(prod)}
                    </div>

                    <button
                      className="incdec_btn"
                      onClick={(e) => {
                        dispatch(increaseItemQuantity(id));
                      }

                      }
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                    </div>
                    :
                    <button class="desc_btn" onClick={()=>dispatch(addToCart(prod))}>
                    <img src="https://bit.ly/3Q6Adni" alt="" class="btn_img"/>
                    <span class="description btn_text">Add to Cart</span>
                </button>

             }
                
            </div>
        </div>
    </section>
}
    </>
  )
}

export default Prod_desc;

