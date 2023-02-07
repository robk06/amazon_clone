import React from "react";
import { useStateValue } from "../stateprovider/StateProvider";
import "./CheckoutProduct.css";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    {/* This dispatches the REMOVE_FROM_BASKET action and passes the id to find the correct item to be removed. */}
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
        {/* This create an empty array and then map through according to the number of stars. It will place a star for each time it had to map through. */}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {/* Only render this button if it's not hidden. This will ensure it doesn't show on the Orders page. */}
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Cart</button>
        )}
        
      </div>
    </div>
  );
}

export default CheckoutProduct;
