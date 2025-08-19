import { Link } from "./Link"
// import Banner from '../../../public/kaff-banner.png';

function HomeBanner() {
  return (
    <>
      <div className="banner_sec">
        <img src="../../../public/discover-your-perfect-brew.webp" alt="Kaff Banner" />
        <div className="container">
          <div className="banner_content">
            <h1>Reinvent Your Kitchen</h1>
            <p>Experience the art of Italian design in your kitchen</p>
            <Link to="/shop" className="kaff_btn">Discover more</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeBanner