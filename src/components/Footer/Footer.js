import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RoomIcon from '@mui/icons-material/Room';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react';
import "./Footer.css"

const Footer = () => {
    return (
        <>
      <div className="footerContainer">
        <div className="LEFT">
          <h1>TRENDS.</h1>
          <p className="Desc">
          You can have anything you want in life if you dress for it.
          Fashion is the armor to survive the reality of everyday life.
          </p>
          <div className="SocialContainer">
            <div className="SocialIcon fb">
              <FacebookIcon />
            </div>
            <div className="SocialIcon ig">
              <InstagramIcon />
            </div>
            <div className="SocialIcon tw">
              <TwitterIcon />
            </div>
            <div className="SocialIcon pt">
              <PinterestIcon />
            </div>
          </div>
        </div>

        <div className="Center">
          <h3 style={{marginBottom:"0.8em",marginLeft:"0.6em"}}>Useful Links</h3>
          <ul>
            <li>Home</li>
            <li>Cart</li>
            <li>Man Fashion</li>
            <li>Woman Fashion</li>
            <li>Accessories</li>
            <li>My Account</li>
            <li>Order Tracking</li>
            <li>Wishlist</li>
            <li>Terms</li>
          </ul>
        </div>
        <div className="Right">
          <h3 style={{marginBottom:"30px"}}>Contact</h3>
          <div className="ContactItem">
            <RoomIcon style={{marginRight:"10px"}}/> A-54, South-Delhi ,302020
          </div>
          <div className="ContactItem">
            <PhoneIcon style={{marginRight:"10px"}}/> +91 8000434123
          </div>
          <div className="ContactItem">
            <MailOutlineIcon style={{marginRight:"10px"}} /> contact@trends.help
          </div>
          <img src="https://i.ibb.co/Qfvn4z6/payment.png" style={{width:"50%"}}/>
           </div>
       
      </div>
      </>
    
    );
  };
  
  export default Footer;
  