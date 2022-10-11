import React from 'react'
import "./Footer.css"


function Footer() {
  return (
    <div className='footer'>
        <button className='btn-scroll__to_top' onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }} >Back to top</button>

            <div className="footer__table">
                <div className="footer__table__row">
                    <div className="table__column">
                        <h4>Get to Know Us</h4>
                        <ul>
                        <li><a href="#footer">About Us</a></li>
                        <li><a href="#footer">Careers</a></li>
                        <li><a href="#footer">Corporate Information</a></li>
                        <li><a href="#footer">Press Releases</a></li>
                        </ul>
                    </div>

                    <div className="table__column">
                        <h4>Make Money with Us</h4>
                        <ul>
                            <li><a href="#footer">Independently Publish with Us</a></li>
                            <li><a href="#footer">Sell on Amazon</a></li>
                            <li><a href="#footer">Advertise Your Products</a></li>
                            <li><a href="#footer">Associates Program</a></li>
                        </ul>
                    </div>

                    <div className="table__column">
                        <h4>Let Us Help You</h4>
                        <ul>
                            <li><a href="#footer">Your Account</a></li>
                            <li><a href="#footer">Your Orders</a></li>
                            <li><a href="#footer">Delivery Rates & Policies</a></li>
                            <li><a href="#footer">Returns & Replacements</a></li>
                            
                        </ul>
                    </div>

                </div>
            </div>

            <div className='footer__logo__container'>
            <a href="/">
            <img
          className="footer__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
            </a>
            </div>

            <div className="footer__copyright">
                <div className="footer__copyright__table">
                <div className="footer__copyright__table__row">
                    <div className="copyright__table__column">
                        <ul>
                            <li><a href="#footer">Conditions of Use & Sale</a></li>
                        </ul>
                    </div>

                    <div className="copyright__table__column">
                        <ul>
                        <li><a href="#footer">Privacy Notice</a></li>
                        </ul>
                    </div>

                    <div className="copyright__table__column">
                        <ul>
                        <li><a href="#footer">Interest-Based Ads Notice</a></li>
                        </ul>
                    </div>

                </div>
        
                <div className="footer__copyright__table__row__clone">
                <span>© 2022 Amazon Clone</span>
                </div>
                
            </div>
            </div>
    </div>
  )
}

export default Footer