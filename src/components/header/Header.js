import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateprovider/StateProvider";
import { auth } from "../../firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  //If the user is signed in, the authentication module from Firebase will be pulled and the user will be signed out.
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
 
      <div className="header__nav">
      {/* If not recongised as a user, only then direct the user to the login page. */}
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
          {/* Hello Guest is shown if the user does not have an account or is not signed in. Hello followed by the user's email will be shown if the user has signed in. */}
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to='/orders'><div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div></Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        {/* The optional chaining operator (?.) accesses an object's property or calls a function. If the object is undefined or null, it returns undefined instead of throwing an error. */}

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon /> 
            <span className="header__optionLineTwo header__basketCount"> 
              {basket?.length} 
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;


