import { Image } from "@shopify/hydrogen";

// Sample data array - replace with your actual data
const discoverData = [
    {
        id: 1,
        image: "discover-img1.png",
        title: "Pan India Service",
        description: "200+ service centers"
    },
    {
        id: 2,
        image: "discover-img2.png", 
        title: "5 year Warranty",
        description: "Extended Protection"
    },
    {
        id: 3,
        image: "discover-img3.png",
        title: "Italian Design", 
        description: "Award-wining Aesthetics"
    },
    {
        id: 4,
        image: "discover-img4.png",
        title: "Expert Support", 
        description: "24/7 assistance"
    }
];

const DiscoverHomeSection = () => {
    return (
        <section className="discover_sec">
            <div className="container">
                <div className="discover_sec_heading">
                    <h2>Discover Our <br /> Difference</h2>
                </div>
                <div className="discover_sec_grid">
                    {discoverData.map((item) => (
                        <div key={item.id} className="discover_box">
                            <Image src={item.image} alt={item.title} />
                            <div className="discover_cnt">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DiscoverHomeSection;