import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import Techbanner from '../../public/technology-innovation-banner.png';

const TechnologyHomeSection = () => {
  return (
    <section className="technology_sec">
    <Image src={Techbanner} alt="Technology Banner" className="banner_image" />
      <div className="container">
        <div className="tech_cnt">
          <h2>
            Technology & Innovation
          </h2>
          <p>KAFF transforms the need for a healthy, comfortable home into new cooking solutions that stimulate a different way of living.</p>
          <Link to="#" className="kaff_btn">Explore More</Link>
        </div>
      </div>
    </section>
  );
};

export default TechnologyHomeSection;