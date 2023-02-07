import React from "react";
import "./Checkout.css";
import Subtotal from "../../components/subtotal/Subtotal";
import { useStateValue } from "../stateprovider/StateProvider";
import CheckoutProduct from "../checkoutproduct/CheckoutProduct";
import { Link } from "react-router-dom";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Cart</h2>
          {/* If the user's basket contains more than 0 items, each checkout item will be shown. Otherwise, if the user has 0 items in their basket, "you have no items in your basket" will be shown" */}

          {basket.length > 0 ? basket.map((item) => (

            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            /> )) : <p className="no__items">You have no items in your cart. <Link to="/" className="no__items__link">Start adding some.</Link></p> 
          }
             
          
        </div>
      </div>

      


      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
