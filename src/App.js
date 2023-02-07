import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Checkout from "./components/checkout/Checkout";
import Payment from "./components/payment/Payment";
import Orders from "./components/orders/Orders";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./components/stateprovider/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51Lmp7kA1xmnDGI8RKmgpCgDVRli2ZjR8m5ISEuNbdyeyNJMso9UoCdiBsFe598q84qePYB6N7qaduL5gsX21wRGo002xUh1Z0V"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads. Once the app has loaded, the onAuthStateChanged listener is attached to listen for logins or logouts. If it notices a login or logout, it will refire. It also provides the user's credentials upon login or logout. 
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      // If there is an authUser, that means that the user just logged in or the user was logged in.
      // The dispatch will fire the information about the user into the data layer and will set the user as the user who just logged in. This will happen everytime they log in. Whenever the user logs out, it will remove the information about the user from the data layer.
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // If the user is logged out, the user will be set as null.
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // Router allows a user to access the login, checkout, payment and orders pages. A route is defined and the elements speciifed are rendered upon page load.
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={[<Header />, <Home />, <Footer />]} />

          <Route path="login" element={<Login />} />

          <Route path="checkout" element={[<Header />, <Checkout />]} />

          <Route
            path="payment"
            element={[
              <Header />,
              <Elements stripe={promise}>
                <Payment />
              </Elements>,
            ]}
          />

          <Route path="orders" element={[<Header />, <Orders />, <Footer />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
