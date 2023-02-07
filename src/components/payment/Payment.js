import React, { useEffect, useState } from "react";
import CheckoutProduct from "../checkoutproduct/CheckoutProduct";
import { useStateValue } from "../stateprovider/StateProvider";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer/Reducer";
import axios from "../axios/Axios";
import { db } from "../../firebase"

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // This generates the special stripe secret which allows us to charge a customer. 

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //We are passing the total here. Also, Stripe expects the total in a currency's subunits E.g. if you're using dollars, it should be in cents, which is why it is being multiplied by 100 here.
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    };

    //Whenever the basket changes, we are provided with a new client secret to ensure the customer is charged the correct amount. 
    getClientSecret();
  }, [basket]);

  console.log("The Secret is ", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //This will prevent a user from pressing the Buy Now button again while a payment is being processed.
    setProcessing(true);

    //Card payment is confirmed here using the client secret. The payment method is the card details entered into the card element. 
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation.

        //This is using a NOSQL database structure. 
        //This adds basket items, amount and the created date and time to the Firestore database against the correct user. 
        db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
        })

        //If there were no issues with the payment, the following are set. 
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        //The basket is emptied after payment has been made. 
        dispatch({
            type: 'EMPTY_BASKET'
        })

        //After the payment has been made, the user is directed to the Orders page. 
        navigate("/orders", { replace: true });
      });
  };

  const handleChange = (e) => {
    //This disables the CardElement while it's empty.
    setDisabled(e.empty);
    // This will listen for changes in the CardElement and display any errors as the customer types their card details.
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* Payment Section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Sydney, NSW, Australia</p>
          </div>
        </div>
        {/* Payment Section - review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>

          {/* This will show all of the items which are currently in the user's basket. For every item in the basket, it will return the following. */}
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment Section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/*  */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                {/* When the payment is being processed, the word "processing" will be displayed, otherwise "Buy Now" will be displayed. */}
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
