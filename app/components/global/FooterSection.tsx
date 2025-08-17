import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import FooterLogo from '../../../public/footer-logo.png'
import Facebook from '../../../public/social-icon1.png'
import Instagram from '../../../public/social-icon2.png'
import linkedin from '../../../public/social-icon3.png'
import Youtube from '../../../public/social-icon4.png'

const FooterSection = () => {
  return (
    <>
      <footer className="footer_sec">
        <div className="container">
          <div className="footer_sec__content">
            <div className="footer_sec__grid">
              {/* Products Column */}
              <div className="footer_sec__column">
                <h3 className="footer_sec__title">Products</h3>
                <ul className="footer_sec__links">
                  <li><Link to="/products/cooking-appliances" className="footer_sec__link"><b>Cooking Appliances</b> </Link></li>
                  <li><Link to="/products/hobs" className="footer_sec__link">Hobs</Link></li>
                  <li><Link to="/products/gas-hobs" className="footer_sec__link">Gas Hobs</Link></li>
                  <li><Link to="/products/induction-hobs" className="footer_sec__link">Induction Hobs</Link></li>
                  <li><Link to="/products/ovens" className="footer_sec__link">Ovens</Link></li>
                  <li><Link to="/products/microwave" className="footer_sec__link">Microwave</Link></li>
                  <li><Link to="/products/ovens" className="footer_sec__link">Ovens</Link></li>
                </ul>
              </div>

              {/* Second Products Column */}
              <div className="footer_sec__column">
                <h3 className="footer_sec__title">&nbsp;</h3>
                <ul className="footer_sec__links">
                  <li><Link to="/products/cleaning-ventilation" className="footer_sec__link"><b>Cleaning & Ventilation</b> </Link></li>
                  <li><Link to="/products/chimneys" className="footer_sec__link">Chimneys</Link></li>
                  <li><Link to="/products/wall-mounted" className="footer_sec__link">Wall Mounted</Link></li>
                  <li><Link to="/products/dishwashers" className="footer_sec__link">Dishwashers</Link></li>
                  <li><Link to="/products/built-in" className="footer_sec__link">Built-in</Link></li>
                  <li><Link to="/products/free-standing" className="footer_sec__link">Free Standing</Link></li>
                </ul>
              </div>

              {/* Third Products Column */}
              <div className="footer_sec__column">
                <h3 className="footer_sec__title">&nbsp;</h3>
                <ul className="footer_sec__links">
                  <li><Link to="/products/kitchen-hardware" className="footer_sec__link"><b>Kitchen Hardware</b></Link></li>
                  <li><Link to="/products/storage-systems" className="footer_sec__link">Storage Systems</Link></li>
                  <li><Link to="/products/pull-out-systems" className="footer_sec__link">Pull Out Systems</Link></li>
                  <li><Link to="/products/corner-solutions" className="footer_sec__link">Corner Solutions</Link></li>
                  <li><Link to="/products/hinges" className="footer_sec__link">Hinges</Link></li>
                  <li><Link to="/products/accessories" className="footer_sec__link">Accessories</Link></li>
                </ul>
              </div>
              {/* Resources Column */}
              <div className="footer_sec__column">
                <h3 className="footer_sec__title">Resources</h3>
                <ul className="footer_sec__links">
                  <li><Link to="/resources/product-manuals" className="footer_sec__link">Product Manuals</Link></li>
                  <li><Link to="/resources/videos" className="footer_sec__link">Videos</Link></li>
                  <li><Link to="/resources/installation-guides" className="footer_sec__link">Installation Guides</Link></li>
                  <li><Link to="/blog" className="footer_sec__link">Blog</Link></li>
                  <li><Link to="/faq" className="footer_sec__link">FAQ</Link></li>
                  <li><Link to="/track-order" className="footer_sec__link">Track Order</Link></li>
                  <li><Link to="/service-request" className="footer_sec__link">Service Request</Link></li>
                  <li><Link to="/warranty-registration" className="footer_sec__link">Warranty Registration</Link></li>
                </ul>
              </div>

              {/* Company Column */}
              <div className="footer_sec__column">
                <h3 className="footer_sec__title">Company</h3>
                <ul className="footer_sec__links">
                  <li><Link to="/about" className="footer_sec__link">About Us</Link></li>
                  <li><Link to="/smart-waste-management" className="footer_sec__link">Smart Waste Management</Link></li>
                  <li><Link to="/contact" className="footer_sec__link">Contact Us</Link></li>
                  <li><Link to="/customer-care" className="footer_sec__link">Customer Care: 1800-180-2271</Link></li>
                  <li><Link to="/store-locator" className="footer_sec__link">Store Locator</Link></li>
                  <li><Link to="/careers" className="footer_sec__link">Careers</Link></li>
                  <li><Link to="/privacy-policy" className="footer_sec__link">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-service" className="footer_sec__link">Terms of Service</Link></li>
                  <li><Link to="/feedback" className="footer_sec__link">Feedback</Link></li>
                </ul>
              </div>

              {/* Business Column */}
              <div className="footer_sec__column">
                <h3 className="footer_sec__title">For Business</h3>
                <ul className="footer_sec__links">
                  <li><Link to="/become-dealer" className="footer_sec__link">Become a Dealer</Link></li>
                  <li><Link to="/open-brand-store" className="footer_sec__link">Open a Brand Store</Link></li>
                  <li><Link to="/service-franchise" className="footer_sec__link">Service Franchise</Link></li>
                  <li><Link to="/bulk-orders" className="footer_sec__link">Bulk Orders</Link></li>
                  {/* <li><Link to="/payment-methods" className="footer_sec__link">Payment Methods</Link></li> */}
                </ul>
              </div>
            </div>
            {/* Social Media Column */}
            <div className="footer_sec__column footer_sec__social-column">
              <h3 className="footer_sec__title">Follow Us On</h3>
              <div className="footer_sec__social-icons">
                <a href="#" target="_blank" rel="noopener noreferrer" className="footer_sec__social-link">
                  <Image src={Facebook} alt="Facebook" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="footer_sec__social-link">
                  <Image src={Instagram} alt="Instagram" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="footer_sec__social-link">
                  <Image src={linkedin} alt="LinkedIn" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="footer_sec__social-link">
                  <Image src={Youtube} alt="YouTube" />

                </a>
              </div>

              <div className="footer_sec__newsletter">
                <p className="footer_sec__newsletter-text">
                  Enter your email to receive news, promotions, and information about KAFF
                </p>
                <form className="footer_sec__newsletter-form">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="footer_sec__newsletter-input"
                    required
                  />
                  <button type="submit" className="footer_sec__newsletter-button">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="footer_sec__bottom">
            <p className="footer_sec__copyright">
              Copyright © 1995-2025 KAFF. All Rights reserved.
            </p>
          </div>

        </div>
      </footer>
      <div className="footer_logo">
        <div className="container">
          <Image src={FooterLogo} alt="KAFF Logo" />
        </div>
      </div>
    </>
  );
};

export default FooterSection;