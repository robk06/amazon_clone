import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../stateprovider/StateProvider";
import { getBasketTotal } from "../reducer/Reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      {/* This redirects the user to the payment page once they've clicked this button. */}
      <button onClick={(e) => navigate("/payment", { replace: true })}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
