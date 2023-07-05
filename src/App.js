import React,{ useEffect } from 'react';
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import {Routes,Route} from 'react-router-dom';
import CartPage from './components/cartPage';
import Checkout from './components/checkout';
import Admin from './components/admin';
import AdminMain from './components/adminMain';
import ProductPage from './components/ProductPage';
import{useDispatch,useSelector} from "react-redux";
import { getAllData} from './features/productsSlice';
import Signup from "./components/userAuth/Signup";
import Login from "./components/userAuth/Login";
import Dashboard from "./components/userAuth/dashboard";
import UpdateProfile from "./components/userAuth/UpdateProfile";
import ForgotPassword from "./components/userAuth/ForgotPassword";
import Data from "./products"
import { writeProductsData,storeProductData } from './firebase';
import './App.css'
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import { getAllPromo } from './features/promotionSlice';
import Prod_desc from './components/Prod_Description/Prod_desc';

function App() {
  const data=useSelector((state)=>state.Users);
  console.log("users",data);
  const dispatch =useDispatch();
  
useEffect(()=>{
  console.log("...user",data)
  for(let i=0;i<Data.length;++i)
  {
    writeProductsData(Data[i].id,Data[i].title,Data[i].price,
      Data[i].image,
      Data[i].company,
      Data[i].description,
      Data[i].category,
      Data[i].quantity,
      Data[i].stock      
      )

      storeProductData(Data[i].id,Data[i].title,Data[i].price,
        Data[i].image,
        Data[i].company,
        Data[i].description,
        Data[i].category,
        Data[i].quantity,
        Data[i].stock      
        )
  }
  dispatch(getAllData());
  dispatch(getAllPromo());
},[])

  return (
    <>
      <div className="App">
      <Navbar/>
        {data.authenticated?
          <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/dashboard" element={<Dashboard />}/>

        <Route exact path="/update-profile" element={<UpdateProfile/>}/>
        <Route exact path="/product_desc/:index/:id/:title/:category" element={<Prod_desc/>}/>
        <Route exact path="/products" element={<ProductCard/>}/>

          <Route exact path="/cart" element={<CartPage/>}/>
          <Route exact path="/cart/checkout" element={<Checkout/>}/>
          {data.currentUser.email==="guptavaibhav378@gmail.com" &&(
            <>
          <Route exact path="/admin" element={<Admin/>}/>
          <Route exact path="/adminMain" element={<AdminMain/>}/>
          <Route exact path="/adminMain/:name/:id/:index" element={<ProductPage/>}/>
          </>)
          }
          
    </Routes>
   :
   <Routes>
    <Route exact path="/" element={<Home />}/>
     <Route exact path="/Login" element={<Login />}/>
     <Route exact path="/signup" element={<Signup/>}/>
     <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
     <Route exact path="/products" element={<ProductCard/>}/>
     <Route exact path="/product_desc/:index/:id/:title/:category" element={<Prod_desc/>}/>
        <Route exact path="/cart" element={<CartPage/>}/>
        <Route exact path="/cart/checkout" element={<Checkout/>}/>
 
 </Routes>

      }
      <Footer/>
      </div>
      </>
    
  );
}

export default App;
