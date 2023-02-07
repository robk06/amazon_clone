import React from "react";
import { useStateValue } from "../stateprovider/StateProvider";
import "./Product.css";


// The Product props are passed here.
function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue(); //basket is the state and dispatch is the dispatch function

  const addToBasket = () => {
    //dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
        {/* This creates an empty array for the rating, maps through the ratings for each product and displays the respective ratings */}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>

      <img className="product__image" src={image} alt="" />

      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
