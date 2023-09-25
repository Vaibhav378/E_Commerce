import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useSelector } from "react-redux";



export default function Home() {
  const promos = useSelector((state) => state.promo.promotions);
  console.log("...promos", promos);
  let firstFourPromos;
  if (promos.length !== 0) {
    //for slicing only first ten element from the promos..
    firstFourPromos = promos.slice(5, 9);
  }
  const [counter, setCounter] = useState(0);

  //this will come into effect when the components mounts..
  useEffect(() => {
    let interval;
    if (promos.length !== 0) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          const nextCounter = (prevCounter + 1) % firstFourPromos.length;
          return nextCounter;

        });
      }, 3000);
    }

    //The returned cleanup function from useEffect clears the interval using clearInterval to stop the slideshow when the component unmounts.
    return () => clearInterval(interval);
  }, []);

  const handleManualNav=(index)=>{
    const radioElement = document.getElementById(`radio${index}`);
    radioElement.checked = true;
    setCounter(index);

  }

  return (
    <>
    
      {promos.length !== 0 && (
        <>
          <div className="info">
            <div className="content">
              <div className="head">
                <h1>Ready for new stuff</h1>
                <p>Buy new stock at reasonable cost</p>

                <Link to="/products">
                  <button>Get Started</button>
                </Link>
              </div>
            </div>
            <div className="pic">
             

              <div className="slides">
                {firstFourPromos.map((_, index) => (
                  <input type="radio" name={`radio-btn${index}`} id={`radio${index}`}
                  checked={counter === index}
                  />
                ))}


                {firstFourPromos.map((promo, index) => (
                  <div className={`slide ${index === 0 ? "first" : ""}`} key={`slide${index}`}>
                    {/* https is added because imageUrl is only the filepath domain so in order to access it we have to use https */}
                    <img src={`https://${promo.imageUrl}`} alt="" />
                  </div>
                ))}


                {/* automatic navigation start */}
                <div className="navigation-auto">
                  {firstFourPromos.map((_, index) => (
                    <div className={`auto-btn${index + 1}`} key={`auto-btn${index + 1}`}></div>
                  ))}
                </div>
                {/* automatic navigation end */}
              </div>

              {/* manual navigation start */}
              {/* onClick event handler in the label elements to call handleManualNav with a callback function instead of calling it directly. This ensures that the function is called only when the label element is clicked and the DOM elements are available. */}
              <div className="navigation-manual">
                {firstFourPromos.map((_, index) => (
                  <label for={`radio${index}`} name={`btn-${index + 1}`} className="manual-btn" onClick={() => handleManualNav(index)}></label>
                ))}

              </div>
              {/* manual navigation end */}





            </div>

          </div>
        </>
      )}
    </>
  );
};
